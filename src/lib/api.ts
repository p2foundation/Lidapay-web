import { z } from "zod";
import { getAccessToken, setAccessToken, setRefreshToken, getRefreshToken, setStoredUser, clearAuth, getStoredUser, setLoginTime, isRecentLogin } from "./storage";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.advansistechnologies.com";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? "/api/v1";

// Helper function to safely extract error message from various error formats
export function extractErrorMessage(error: any, fallback: string = "An error occurred"): string {
  if (!error) return fallback;
  
  // If it's already a string, return it
  if (typeof error === 'string') return error;
  
  // Try to extract message from nested structures
  const message = 
    error?.payload?.message?.message ||
    error?.payload?.message ||
    error?.message ||
    error?.error ||
    fallback;
  
  // Ensure the result is a string
  if (typeof message === 'string') return message;
  if (typeof message === 'object') {
    // If message is an object, try to stringify it or get its message property
    return message?.message || JSON.stringify(message);
  }
  
  return String(message || fallback);
}

function url(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${API_VERSION}${p}`;
}

export class ApiError extends Error {
  status: number;
  payload: unknown;
  path?: string;
  
  constructor(status: number, message: string, payload?: unknown, path?: string) {
    super(message);
    this.status = status;
    this.payload = payload;
    this.path = path;
  }
}

// Track if we're currently in a login flow to prevent premature auth clearing
let isLoggingIn = false;
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

// Refresh access token using refresh token
async function refreshAccessToken(): Promise<string | null> {
  // If already refreshing, return the existing promise
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        return null;
      }

      const res = await fetch(url("/users/refresh"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ refresh_token: refreshToken })
      });

      const text = await res.text();
      const data = text ? safeJson(text) : null;

      if (!res.ok) {
        // Refresh failed, clear auth
        clearAuth();
        return null;
      }

      // Extract new tokens (handle both snake_case and camelCase)
      const access = (data as any)?.access_token ?? (data as any)?.accessToken;
      const refresh = (data as any)?.refresh_token ?? (data as any)?.refreshToken;

      if (access) {
        setAccessToken(access);
        if (refresh) {
          setRefreshToken(refresh);
        }
        // Update login time to prevent premature logout
        setLoginTime();
        return access;
      }

      // No access token in response
      clearAuth();
      return null;
    } catch (error) {
      clearAuth();
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function request<T>(path: string, init?: RequestInit, opts?: { auth?: boolean }): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  if (!headers.has("Content-Type") && init?.body) headers.set("Content-Type", "application/json");

  let hasAuthToken = false;
  if (opts?.auth !== false) {
    const token = getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      hasAuthToken = true;
    }
  }

  try {
    const res = await fetch(url(path), { ...init, headers });
    const text = await res.text();
    const data = text ? safeJson(text) : null;

    if (!res.ok) {
      // Handle 401 Unauthorized - try to refresh token first
      if (res.status === 401) {
        const isAuthEndpoint = path.includes('/login') || path.includes('/register') || path.includes('/auth') || path.includes('/refresh');
        const justLoggedIn = isRecentLogin(20000); // 20 seconds grace period after login
        
        // Don't try to refresh if:
        // 1. This is an auth endpoint (expected to return 401)
        // 2. We don't have a token (we're not logged in) - wait, hasAuthToken is from getAccessToken()
        // 3. We just logged in (within grace period - might be a race condition)
        if (!isAuthEndpoint && hasAuthToken && !justLoggedIn && opts?.auth !== false) {
          // Try to refresh the token
          const newAccessToken = await refreshAccessToken();
          
          if (newAccessToken) {
            // Retry the original request with new token
            const retryHeaders = new Headers(init?.headers);
            retryHeaders.set("Accept", "application/json");
            if (!retryHeaders.has("Content-Type") && init?.body) {
              retryHeaders.set("Content-Type", "application/json");
            }
            retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);
            
            const retryRes = await fetch(url(path), { ...init, headers: retryHeaders });
            const retryText = await retryRes.text();
            const retryData = retryText ? safeJson(retryText) : null;
            
            if (retryRes.ok) {
              return retryData as T;
            }
            
            // If retry still fails with 401, token refresh didn't work
            if (retryRes.status === 401) {
              clearAuth();
              if (typeof window !== 'undefined') {
                const currentPath = window.location.pathname;
                const protectedPaths = ['/app', '/admin', '/airtime', '/data', '/transactions', '/settings', '/rewards', '/chat'];
                const isProtectedPage = protectedPaths.some(p => currentPath.startsWith(p));
                if (isProtectedPage && !currentPath.startsWith('/login') && !currentPath.startsWith('/register')) {
                  // Use setTimeout to allow React Query to handle the error first
                  setTimeout(() => {
                    window.location.href = '/login';
                  }, 100);
                }
              }
            }
          } else {
            // Refresh failed, clear auth and redirect
            clearAuth();
            if (typeof window !== 'undefined') {
              const currentPath = window.location.pathname;
              const protectedPaths = ['/app', '/admin', '/airtime', '/data', '/transactions', '/settings', '/rewards', '/chat'];
              const isProtectedPage = protectedPaths.some(p => currentPath.startsWith(p));
              if (isProtectedPage && !currentPath.startsWith('/login') && !currentPath.startsWith('/register')) {
                // Use setTimeout to allow React Query to handle the error first
                setTimeout(() => {
                  window.location.href = '/login';
                }, 100);
              }
            }
          }
        }
      }
      
      const msg =
        (data && typeof data === "object" && (data as any).message) ||
        (data && typeof data === "object" && (data as any).error) ||
        res.statusText ||
        "Request failed";
      
      // Ensure msg is a string, handle object cases
      let errorMessage = typeof msg === 'string' ? msg : 
                           msg && typeof msg === 'object' ? JSON.stringify(msg) :
                           String(msg || 'Request failed');
      
      if (path) {
        errorMessage = `${errorMessage} (Path: ${path})`;
      }
      
      // Only log in development mode, and suppress expected errors (401, 404)
      if (process.env.NODE_ENV === 'development' && res.status !== 401 && res.status !== 404) {
        const errorInfo: Record<string, unknown> = {
          path,
          status: res.status,
          statusText: res.statusText || 'Unknown',
          message: errorMessage,
        };
        
        if (data !== null && data !== undefined) {
          try {
            const dataStr = typeof data === 'string' ? data : JSON.stringify(data);
            if (dataStr && dataStr !== '{}' && dataStr !== 'null') {
              errorInfo.data = data;
            }
          } catch {
            errorInfo.data = '[Non-serializable data]';
          }
        }
        
        if (Object.keys(errorInfo).length > 0 && errorInfo.message) {
          console.error('API Error:', errorInfo);
        }
      } else if (res.status === 401) {
         // Log 401 errors specifically to help debug "Token not found"
         console.warn(`[API] 401 Unauthorized for ${path}. Auth enabled: ${opts?.auth !== false}, Has Token: ${hasAuthToken}`);
         console.trace("401 Unauthorized Request Trace");
      }
      
      throw new ApiError(res.status, errorMessage, data, path);
    }

    return data as T;
  } catch (error) {
    // Re-throw ApiError instances
    if (error instanceof ApiError) {
      throw error;
    }
    // Log network errors only in development
    if (process.env.NODE_ENV === 'development') {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Network Error:', {
        path,
        error: errorMessage,
        type: error instanceof Error ? error.constructor.name : typeof error
      });
    }
    throw error;
  }
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// -----------------------------
// Auth
// -----------------------------

const LoginResponseSchema = z.object({
  access_token: z.string().optional(),
  refresh_token: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  user: z
    .object({
      _id: z.string().optional(),
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      email: z.string().optional().nullable(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
      phoneNumber: z.string().optional().nullable()
    })
    .optional()
});

export async function login(username: string, password: string) {
  try {
    // Validate inputs
    if (!username || username.trim().length === 0) {
      throw new Error("Username is required");
    }
    if (!password || password.length === 0) {
      throw new Error("Password is required");
    }

    const raw = await request<unknown>("/users/login", {
      method: "POST",
      body: JSON.stringify({ 
        username: username.trim(), 
        password 
      })
    }, { auth: false });

    // Parse response
    const parsed = LoginResponseSchema.safeParse(raw);
    
    if (!parsed.success) {
      // If schema parsing fails, try to extract tokens directly
      const data = raw as any;
      const access = data?.access_token ?? data?.accessToken;
      const refresh = data?.refresh_token ?? data?.refreshToken;
      const user = data?.user ?? data; // API might return user directly
      
      if (access) {
        setAccessToken(access);
        if (refresh) setRefreshToken(refresh);
        setLoginTime(); // Mark login time to prevent premature logout
        
        // Try to extract user info
        const userId = user?._id ?? user?.id;
        if (userId) {
          setStoredUser({
            id: userId,
            username: user?.username ?? null,
            email: user?.email ?? null,
            firstName: user?.firstName ?? null,
            lastName: user?.lastName ?? null,
            phoneNumber: user?.phoneNumber ?? null
          });
        }
        return raw;
      } else {
        throw new Error("Invalid response: No access token received");
      }
    }

    // Schema parsing succeeded
    const v = parsed.data;
    const access = v.access_token ?? v.accessToken;
    const refresh = v.refresh_token ?? v.refreshToken;
    
    if (!access) {
      throw new Error("Invalid response: No access token received");
    }
    
    setAccessToken(access);
    if (refresh) setRefreshToken(refresh);
    setLoginTime(); // Mark login time to prevent premature logout

    const u = v.user;
    const id = u?._id ?? u?.id;
    if (id) {
      setStoredUser({
        id,
        username: u?.username ?? null,
        email: u?.email ?? null,
        firstName: u?.firstName ?? null,
        lastName: u?.lastName ?? null,
        phoneNumber: u?.phoneNumber ?? null
      });
    }
    
    return raw;
  } catch (error: any) {
    // Improve error messages
    if (error instanceof ApiError) {
      if (error.status === 401) {
        throw new Error("Invalid username or password");
      } else if (error.status === 404) {
        throw new Error("Login endpoint not found. Please check API configuration.");
      } else if (error.status === 400) {
        const message = error.payload && typeof error.payload === 'object' && (error.payload as any).message 
          ? (error.payload as any).message 
          : "Invalid request. Please check your credentials.";
        throw new Error(message);
      } else {
        const message = error.payload && typeof error.payload === 'object' && (error.payload as any).message 
          ? (error.payload as any).message 
          : error.message || "Login failed. Please try again.";
        throw new Error(message);
      }
    }
    throw error;
  }
}

export async function logout() {
  clearAuth();
}

export async function register(input: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  country: string; // Full country name like "GHANA"
  roles?: string; // "USER", "MERCHANT", or "AGENT"
  referrerClientId?: string;
}) {
  const raw = await request<unknown>("/users/register", {
    method: "POST",
    body: JSON.stringify({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phoneNumber: input.phoneNumber,
      password: input.password,
      country: input.country.toUpperCase(),
      roles: input.roles ?? "USER",
      referrerClientId: input.referrerClientId
    })
  }, { auth: false });

  return raw;
}

// -----------------------------
// Profile / Wallet / Points
// -----------------------------

export async function getProfile() {
  return request<any>("/users/profile");
}

export async function updateProfile(input: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}) {
  return request<any>("/users/profile/update", {
    method: "PUT",
    body: JSON.stringify(input)
  });
}

export async function changePassword(input: {
  currentPassword: string;
  newPassword: string;
}) {
  return request<any>("/users/change-password", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export async function getBalance() {
  try {
    return await request<any>("/wallet/balance");
  } catch (error: any) {
    // Handle 404 or other errors gracefully
    if (error?.status === 404) {
      return { balance: 0, currency: "GHS" };
    }
    throw error;
  }
}

export async function getUserPoints() {
  return request<any>("/users/points");
}

// -----------------------------
// Rewards / Transactions
// -----------------------------

export async function getRewards() {
  return request<any>("/rewards");
}

export async function getTransactions(params?: { 
  page?: number; 
  limit?: number;
  transType?: string;
  status?: string;
}) {
  const user = getStoredUser();
  if (!user?.id) throw new Error("No userId found. Please login again.");
  const q = new URLSearchParams();
  q.set("page", String(params?.page ?? 1));
  q.set("limit", String(params?.limit ?? 20));
  if (params?.transType) q.set("transType", params.transType);
  if (params?.status) q.set("status", params.status);
  return request<any>(`/transactions/user/${user.id}?${q.toString()}`);
}

// -----------------------------
// Airtime & Data purchases
// -----------------------------

export type AirtimeProvider = "reloadly" | "prymo";

export type OperatorInfo = {
  id: number;
  operatorId: number;
  name: string;
  bundle: boolean;
  data: boolean;
  pin: boolean;
  comboProduct: boolean;
  supportsLocalAmounts: boolean;
  supportsGeographicalRechargePlans?: boolean;
  denominationType: string;
  senderCurrencyCode: string;
  senderCurrencySymbol: string;
  destinationCurrencyCode: string;
  destinationCurrencySymbol: string;
  commission: number;
  internationalDiscount: number;
  localDiscount: number;
  mostPopularAmount: number;
  mostPopularLocalAmount?: number;
  minAmount: number | null;
  maxAmount: number | null;
  localMinAmount: number | null;
  localMaxAmount: number | null;
  country: { isoName: string; name: string };
  fx: { rate: number; currencyCode: string };
  logoUrls: string[];
  fixedAmounts: number[];
  fixedAmountsDescriptions?: Record<string, string>;
  localFixedAmounts: number[];
  localFixedAmountsDescriptions?: Record<string, string>;
  suggestedAmounts: number[];
  suggestedAmountsMap?: Record<string, any>;
  fees?: {
    international: number;
    local: number;
    localPercentage: number;
    internationalPercentage: number;
  };
  geographicalRechargePlans?: any[];
  promotions?: any[];
  status: string;
};

// Auto-detect operator based on phone number and country
export async function autoDetectOperator(phone: string, countryIsoCode: string): Promise<OperatorInfo | null> {
  try {
    const response = await request<any>("/reloadly/operator/autodetect", {
      method: "POST",
      body: JSON.stringify({ phone, countryIsoCode })
    });
    return response?.data || response || null;
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      const errorMessage = e instanceof Error ? e.message : String(e);
      console.error("Failed to auto-detect operator:", {
        error: errorMessage,
        type: e instanceof Error ? e.constructor.name : typeof e,
        phone,
        countryIsoCode
      });
    }
    return null;
  }
}

// Validate phone number against country (for data)
export async function validatePhoneForCountry(msisdn: string, countryCode: string): Promise<{ valid: boolean; message?: string }> {
  try {
    const response = await request<any>(`/reloadly-data/auto-detect?msisdn=${encodeURIComponent(msisdn)}&countryCode=${encodeURIComponent(countryCode)}`, {
      method: "GET"
    });
    
    // If we get a response, the phone is valid for the country
    if (response) {
      return { valid: true };
    }
    return { valid: false, message: "Phone number does not match the selected country" };
  } catch (e: any) {
    // If auto-detect fails, the phone doesn't match the country
    const errorMsg = e?.payload?.message || e?.message || "Phone number validation failed";
    return { valid: false, message: errorMsg };
  }
}

// Initiate AdvansiPay payment
export async function initiateAdvansiPayPayment(input: {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  amount: number;
  orderDesc: string;
  orderId: string;
  orderImgUrl?: string;
}) {
  const path = `/advansispay/initiate-payment`;
  return request<any>(path, {
    method: "POST",
    body: JSON.stringify({
      userId: input.userId,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phoneNumber: input.phoneNumber,
      username: input.username,
      amount: input.amount,
      orderDesc: input.orderDesc,
      orderId: input.orderId,
      orderImgUrl: input.orderImgUrl || "https://advansistechnologies.com/assets/img/home-six/featured/icon1.png"
    })
  });
}

// Check payment status by order ID
export async function checkPaymentStatus(orderId: string) {
  return request<any>(`/advansispay/payment-status/${orderId}`);
}

// Topup Ghana airtime (Prymo) - direct API call
export async function topupGhanaAirtime(input: {
  recipientNumber: string;
  amount: string | number;
  network: number;
}) {
  const path = `/airtime/topup`;
  return request<any>(path, {
    method: "POST",
    body: JSON.stringify({
      recipientNumber: input.recipientNumber,
      amount: String(input.amount),
      network: input.network
    })
  });
}

// Recharge airtime after payment is complete
export async function rechargeAirtime(input: {
  userId: string;
  operatorId: number;
  amount: number;
  customIdentifier: string;
  recipientEmail: string;
  recipientNumber: string;
  recipientCountryCode: string;
  senderNumber: string;
  senderCountryCode: string;
}) {
  const path = `/reload-airtime/recharge`;
  return request<any>(path, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

// List data operators for a country
export async function listDataOperators(countryCode: string): Promise<OperatorInfo[]> {
  const path = `/reloadly-data/list-operators`;
  const response = await request<any>(path, {
    method: "POST",
    body: JSON.stringify({ countryCode })
  });
  
  // Handle different response structures
  if (Array.isArray(response)) {
    return response;
  }
  if (response?.data && Array.isArray(response.data)) {
    return response.data;
  }
  if (response?.operators && Array.isArray(response.operators)) {
    return response.operators;
  }
  
  return [];
}

// Buy data after payment is complete
export async function buyDataBundle(input: {
  userId: string;
  operatorId: number;
  amount: number;
  customIdentifier: string;
  recipientEmail: string;
  recipientNumber: string;
  recipientCountryCode: string;
  senderNumber: string;
  senderCountryCode: string;
}) {
  const path = `/reloadly-data/buy-data`;
  return request<any>(path, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

// Legacy function - kept for backward compatibility but uses new payment flow
export async function buyAirtime(input: {
  provider: AirtimeProvider;
  recipientPhone: string;
  amount: number;
  countryCode: string;
  operatorId?: string;
  note?: string;
}) {
  // This function is deprecated - use initiateAdvansiPayPayment and rechargeAirtime separately
  throw new Error("buyAirtime is deprecated. Use initiateAdvansiPayPayment and rechargeAirtime instead.");
}

// Legacy function - kept for backward compatibility but uses new payment flow
export async function buyData(input: {
  provider: AirtimeProvider;
  recipientPhone: string;
  dataAmount: number;
  countryCode: string;
  operatorId?: string;
  dataPlanId?: string;
}) {
  // This function is deprecated - use initiateAdvansiPayPayment and buyDataBundle instead.
  throw new Error("buyData is deprecated. Use initiateAdvansiPayPayment and buyDataBundle instead.");
}

// -----------------------------
// Countries
// -----------------------------

export type Country = {
  code: string; // isoName in API
  name: string;
  flag: string; // Flag image URL
  continent?: string;
  currencyCode?: string;
  currencyName?: string;
  currencySymbol?: string;
  callingCodes?: string[];
};

export async function getCountries(): Promise<Country[]> {
  // Try multiple endpoint variations
  const endpoints = ["/reloadly/countries", "/reloadly/country-list"];
  
  for (const endpoint of endpoints) {
    try {
      const response = await request<any>(endpoint, {
        method: "GET"
      }, { auth: false });
      
      // API returns array directly or wrapped
      const countries = Array.isArray(response) ? response : (response?.data || []);
      
      if (countries && countries.length > 0) {
        return countries.map((c: any) => {
          // Ensure calling codes are formatted with + sign
          let callingCodes = c.callingCodes || [];
          if (Array.isArray(callingCodes)) {
            callingCodes = callingCodes.map((cc: string | number) => {
              const codeStr = String(cc);
              return codeStr.startsWith('+') ? codeStr : `+${codeStr}`;
            });
          } else if (callingCodes && typeof callingCodes === 'string') {
            callingCodes = [callingCodes.startsWith('+') ? callingCodes : `+${callingCodes}`];
          } else {
            callingCodes = [];
          }
          
          return {
            code: c.isoName || c.code || "",
            name: c.name || "",
            flag: c.flag || `https://flagcdn.com/w80/${(c.isoName || c.code || "").toLowerCase()}.png`,
            continent: c.continent,
            currencyCode: c.currencyCode,
            currencyName: c.currencyName,
            currencySymbol: c.currencySymbol,
            callingCodes: callingCodes
          };
        }).filter((c: Country) => c.code && c.name);
      }
    } catch (e: any) {
      // Continue to next endpoint or fallback
      if (endpoint === endpoints[endpoints.length - 1]) {
        // Only log error in development mode for the last endpoint attempt
        if (process.env.NODE_ENV === 'development') {
          console.warn("Failed to fetch countries from API endpoints, using fallback:", e?.message || e);
        }
      }
    }
  }
  
  // Return fallback countries if all API attempts fail
  return getFallbackCountries();
}

function getFallbackCountries(): Country[] {
  // Expanded fallback list with more countries including Togo
  return [
    // West Africa
    { code: "GH", name: "Ghana", flag: "https://flagcdn.com/w80/gh.png", callingCodes: ["+233"] },
    { code: "NG", name: "Nigeria", flag: "https://flagcdn.com/w80/ng.png", callingCodes: ["+234"] },
    { code: "TG", name: "Togo", flag: "https://flagcdn.com/w80/tg.png", callingCodes: ["+228"] },
    { code: "BJ", name: "Benin", flag: "https://flagcdn.com/w80/bj.png", callingCodes: ["+229"] },
    { code: "CI", name: "Côte d'Ivoire", flag: "https://flagcdn.com/w80/ci.png", callingCodes: ["+225"] },
    { code: "SN", name: "Senegal", flag: "https://flagcdn.com/w80/sn.png", callingCodes: ["+221"] },
    { code: "ML", name: "Mali", flag: "https://flagcdn.com/w80/ml.png", callingCodes: ["+223"] },
    { code: "BF", name: "Burkina Faso", flag: "https://flagcdn.com/w80/bf.png", callingCodes: ["+226"] },
    { code: "NE", name: "Niger", flag: "https://flagcdn.com/w80/ne.png", callingCodes: ["+227"] },
    { code: "CM", name: "Cameroon", flag: "https://flagcdn.com/w80/cm.png", callingCodes: ["+237"] },
    // East Africa
    { code: "KE", name: "Kenya", flag: "https://flagcdn.com/w80/ke.png", callingCodes: ["+254"] },
    { code: "UG", name: "Uganda", flag: "https://flagcdn.com/w80/ug.png", callingCodes: ["+256"] },
    { code: "TZ", name: "Tanzania", flag: "https://flagcdn.com/w80/tz.png", callingCodes: ["+255"] },
    { code: "ET", name: "Ethiopia", flag: "https://flagcdn.com/w80/et.png", callingCodes: ["+251"] },
    { code: "RW", name: "Rwanda", flag: "https://flagcdn.com/w80/rw.png", callingCodes: ["+250"] },
    // Southern Africa
    { code: "ZA", name: "South Africa", flag: "https://flagcdn.com/w80/za.png", callingCodes: ["+27"] },
    { code: "ZM", name: "Zambia", flag: "https://flagcdn.com/w80/zm.png", callingCodes: ["+260"] },
    { code: "ZW", name: "Zimbabwe", flag: "https://flagcdn.com/w80/zw.png", callingCodes: ["+263"] },
    // North America
    { code: "US", name: "United States", flag: "https://flagcdn.com/w80/us.png", callingCodes: ["+1"] },
    { code: "CA", name: "Canada", flag: "https://flagcdn.com/w80/ca.png", callingCodes: ["+1"] },
    // Europe
    { code: "GB", name: "United Kingdom", flag: "https://flagcdn.com/w80/gb.png", callingCodes: ["+44"] },
    { code: "FR", name: "France", flag: "https://flagcdn.com/w80/fr.png", callingCodes: ["+33"] },
    { code: "DE", name: "Germany", flag: "https://flagcdn.com/w80/de.png", callingCodes: ["+49"] },
    { code: "ES", name: "Spain", flag: "https://flagcdn.com/w80/es.png", callingCodes: ["+34"] },
    // Asia
    { code: "IN", name: "India", flag: "https://flagcdn.com/w80/in.png", callingCodes: ["+91"] },
    { code: "CN", name: "China", flag: "https://flagcdn.com/w80/cn.png", callingCodes: ["+86"] },
    { code: "AE", name: "United Arab Emirates", flag: "https://flagcdn.com/w80/ae.png", callingCodes: ["+971"] },
    { code: "SA", name: "Saudi Arabia", flag: "https://flagcdn.com/w80/sa.png", callingCodes: ["+966"] },
  ];
}