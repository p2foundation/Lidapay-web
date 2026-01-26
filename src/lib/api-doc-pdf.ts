import { format } from "date-fns";

export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  category: string;
}

export const API_BASE_URL = "https://api.advansistechnologies.com";

export const API_ENDPOINTS: ApiEndpoint[] = [
  // Default
  { method: "GET", path: "/", description: "Hello endpoint", category: "default" },
  { method: "GET", path: "/api/v1/.well-known/assetlinks.json", description: "Digital Asset Links", category: "default" },

  // Users
  { method: "POST", path: "/api/v1/users/register", description: "Register a new user", category: "Users" },
  { method: "POST", path: "/api/v1/users/login", description: "Login a user", category: "Users" },
  { method: "POST", path: "/api/v1/users/refresh-token", description: "Generate a new refresh token", category: "Users" },
  { method: "GET", path: "/api/v1/users/points", description: "Get user points", category: "Users" },
  { method: "GET", path: "/api/v1/users/profile", description: "Get user profile", category: "Users" },
  { method: "PUT", path: "/api/v1/users/profile/update", description: "Update user profile", category: "Users" },
  { method: "GET", path: "/api/v1/users", description: "Get all users", category: "Users" },
  { method: "GET", path: "/api/v1/users/phone/{phoneNumber}", description: "Get a user by phone number", category: "Users" },
  { method: "GET", path: "/api/v1/users/email/{email}", description: "Get a user by email", category: "Users" },
  { method: "DELETE", path: "/api/v1/users/delete/{id}", description: "Delete a user by ID", category: "Users" },
  { method: "DELETE", path: "/api/v1/users/delete", description: "Delete all users", category: "Users" },
  { method: "POST", path: "/api/v1/users/merchant/login", description: "Merchant login", category: "Users" },
  { method: "PUT", path: "/api/v1/users/change-password", description: "Change user password", category: "Users" },
  { method: "POST", path: "/api/v1/users/track-qr-code-usage", description: "Track QR code usage", category: "Users" },
  { method: "GET", path: "/api/v1/users/qr-code-usage-stats", description: "Get QR code usage stats", category: "Users" },
  { method: "POST", path: "/api/v1/users/{userId}/scan-qr", description: "Scan a user's QR code", category: "Users" },
  { method: "GET", path: "/api/v1/users/invitation-link/generate", description: "Generate an invitation link for the user", category: "Users" },
  { method: "POST", path: "/api/v1/users/invitation-link/track", description: "Track the usage of an invitation link", category: "Users" },
  { method: "GET", path: "/api/v1/users/invitation-link/stats", description: "Get statistics for the user's invitation links", category: "Users" },
  { method: "GET", path: "/api/v1/users/verify-email/{token}", description: "Verify user email", category: "Users" },
  { method: "POST", path: "/api/v1/users/resend-verification-email", description: "Resend email verification link", category: "Users" },
  { method: "POST", path: "/api/v1/users/verify-phone", description: "Verify user phone number", category: "Users" },
  { method: "POST", path: "/api/v1/users/resend-phone-verification-code", description: "Resend phone verification code", category: "Users" },
  { method: "POST", path: "/api/v1/users/reset-password", description: "Initiate password reset", category: "Users" },
  { method: "POST", path: "/api/v1/users/wallet", description: "Create or update user wallet", category: "Users" },
  { method: "DELETE", path: "/api/v1/users/wallet", description: "Delete user wallet", category: "Users" },
  { method: "GET", path: "/api/v1/users/wallet/{id}", description: "Get wallet by ID", category: "Users" },
  { method: "GET", path: "/api/v1/users/wallet/user", description: "Get user wallet", category: "Users" },
  { method: "GET", path: "/api/v1/users/account", description: "Get user account", category: "Users" },

  // Merchants
  { method: "POST", path: "/api/v1/merchants/register", description: "Register a new merchant", category: "Merchants" },
  { method: "POST", path: "/api/v1/merchants/login", description: "Merchant login", category: "Merchants" },
  { method: "GET", path: "/api/v1/merchants/client/{id}", description: "Find a merchant by ID", category: "Merchants" },
  { method: "GET", path: "/api/v1/merchants/{id}", description: "Find a merchant by ID", category: "Merchants" },
  { method: "DELETE", path: "/api/v1/merchants/{id}", description: "Delete a merchant", category: "Merchants" },
  { method: "GET", path: "/api/v1/merchants", description: "Find all registered merchants", category: "Merchants" },
  { method: "PUT", path: "/api/v1/merchants/update/{id}", description: "Update a merchant", category: "Merchants" },
  { method: "GET", path: "/api/v1/merchants/{clientId}/qrcode", description: "Get a merchant QR code", category: "Merchants" },
  { method: "PUT", path: "/api/v1/merchants/{clientId}/change-password", description: "Change merchant password", category: "Merchants" },
  { method: "POST", path: "/api/v1/merchants/{clientId}/track-qr-usage", description: "Track QR code usage for a merchant", category: "Merchants" },
  { method: "GET", path: "/api/v1/merchants/{clientId}/qr-usage-stats", description: "Get QR code usage stats for a merchant", category: "Merchants" },
  { method: "POST", path: "/api/v1/merchants/{clientId}/scan-qr", description: "Scan QR code", category: "Merchants" },
  { method: "POST", path: "/api/v1/merchants/generate-invitation-link", description: "Generate invitation link", category: "Merchants" },
  { method: "GET", path: "/api/v1/merchants/track-invitation-link/{invitationLink}", description: "Track invitation link usage", category: "Merchants" },
  { method: "GET", path: "/api/v1/merchants/invitation-link-stats", description: "Get invitation link stats", category: "Merchants" },

  // Transactions
  { method: "POST", path: "/api/v1/transactions/create", description: "Create a new transaction", category: "Transactions" },
  { method: "GET", path: "/api/v1/transactions", description: "Get all transactions with pagination", category: "Transactions" },
  { method: "GET", path: "/api/v1/transactions/{id}", description: "Get transaction by ID", category: "Transactions" },
  { method: "PUT", path: "/api/v1/transactions/update/trxn-id{trxn}", description: "Update transaction by transaction ID", category: "Transactions" },
  { method: "PUT", path: "/api/v1/transactions/update/trans-id/{transId}", description: "Update transaction by transaction ID and TransId", category: "Transactions" },
  { method: "DELETE", path: "/api/v1/transactions/delete/{trxn}", description: "Delete transaction by transaction ID and TransId and Trxn", category: "Transactions" },
  { method: "GET", path: "/api/v1/transactions/user/{userId}", description: "Get transactions by user ID with pagination", category: "Transactions" },
  { method: "GET", path: "/api/v1/transactions/stats/{userId}", description: "Get transaction statistics for a user", category: "Transactions" },
  { method: "GET", path: "/api/v1/transactions/date-range", description: "Get transactions by date range", category: "Transactions" },
  { method: "DELETE", path: "/api/v1/transactions/remove/{id}", description: "Delete transaction", category: "Transactions" },
  { method: "GET", path: "/api/v1/transactions/trans-id/{transId}", description: "Get transaction by transaction ID", category: "Transactions" },
  { method: "GET", path: "/api/v1/transactions/trans-trxn/{trxn}", description: "Get transaction by transaction reference", category: "Transactions" },

  // Rewards
  { method: "POST", path: "/api/v1/rewards", description: "Create a new reward", category: "Rewards" },
  { method: "GET", path: "/api/v1/rewards", description: "Find all rewards", category: "Rewards" },
  { method: "GET", path: "/api/v1/rewards/{userId}", description: "Find a reward by userId", category: "Rewards" },
  { method: "PUT", path: "/api/v1/rewards/{userId}", description: "Update a reward", category: "Rewards" },
  { method: "DELETE", path: "/api/v1/rewards/{userId}", description: "Delete a reward", category: "Rewards" },

  // Notifications
  { method: "POST", path: "/api/v1/notifications", description: "Create a new notification", category: "Notifications" },
  { method: "GET", path: "/api/v1/notifications", description: "Find all notifications", category: "Notifications" },
  { method: "GET", path: "/api/v1/notifications/{id}", description: "Find a notification by ID", category: "Notifications" },
  { method: "PUT", path: "/api/v1/notifications/{id}", description: "Update a notification", category: "Notifications" },
  { method: "DELETE", path: "/api/v1/notifications/{id}", description: "Delete a notification", category: "Notifications" },

  // Affiliate
  { method: "POST", path: "/api/v1/affiliate", description: "Create a new affiliate", category: "Affiliate" },
  { method: "GET", path: "/api/v1/affiliate/all", description: "Get all affiliates", category: "Affiliate" },
  { method: "GET", path: "/api/v1/affiliate/{code}", description: "Get referral by code", category: "Affiliate" },
  { method: "GET", path: "/api/v1/affiliate/dashboard/summary", description: "Get dashboard summary", category: "Affiliate" },
  { method: "POST", path: "/api/v1/affiliate/trigger-commission-update", description: "Trigger commission update", category: "Affiliate" },

  // Airtime
  { method: "POST", path: "/api/v1/airtime/transtatus", description: "Query transaction status", category: "Airtime" },
  { method: "POST", path: "/api/v1/airtime/topup", description: "Process airtime top-up", category: "Airtime" },

  // Internet
  { method: "POST", path: "/api/v1/internet/buydata", description: "Buy internet data", category: "Internet" },
  { method: "POST", path: "/api/v1/internet/bundlelist", description: "List data bundles", category: "Internet" },

  // Mobile Money
  { method: "POST", path: "/api/v1/mobilemoney/send", description: "Send money to a recipient", category: "Mobile Money" },
  { method: "POST", path: "/api/v1/mobilemoney/receive", description: "Receive money from a sender", category: "Mobile Money" },

  // PS Mobile Money
  { method: "POST", path: "/api/v1/psmobilemoney/transfermoney", description: "Transfer mobile money", category: "PS Mobile Money" },
  { method: "POST", path: "/api/v1/psmobilemoney/debitwallet", description: "Debit mobile money", category: "PS Mobile Money" },

  // Card Payment
  { method: "GET", path: "/api/v1/pscardpayment/redirecturl", description: "Primary Callback", category: "Card Payment" },
  { method: "POST", path: "/api/v1/pscardpayment/inline", description: "Inline Card Mobile Payments", category: "Card Payment" },

  // SMS
  { method: "POST", path: "/api/v1/sms/sendsms", description: "Send SMS", category: "SMS" },
  { method: "POST", path: "/api/v1/sms/bulk", description: "Send Bulk SMS", category: "SMS" },

  // Reloadly Services
  { method: "GET", path: "/api/v1/reloadly/account-balance", description: "Get Reloadly account balance", category: "Reloadly Services" },
  { method: "GET", path: "/api/v1/reloadly/access-token", description: "Generate Reloadly access token", category: "Reloadly Services" },
  { method: "GET", path: "/api/v1/reloadly/country-list", description: "List supported countries", category: "Reloadly Services" },
  { method: "POST", path: "/api/v1/reloadly/find-country-by-code", description: "Find country by ISO code", category: "Reloadly Services" },
  { method: "POST", path: "/api/v1/reloadly/network-operators", description: "List network operators with pagination and filters", category: "Reloadly Services" },
  { method: "POST", path: "/api/v1/reloadly/find-operator-by-id", description: "Find operator by ID", category: "Reloadly Services" },
  { method: "POST", path: "/api/v1/reloadly/operator/autodetect", description: "Auto-detect operator by phone and country", category: "Reloadly Services" },
  { method: "POST", path: "/api/v1/reloadly/get-operator-by-code", description: "Get operators by country ISO code with filters", category: "Reloadly Services" },
  { method: "GET", path: "/api/v1/reloadly/operators/{operatorId}/fx-rate", description: "Fetch FX rate for operator and amount", category: "Reloadly Services" },

  // Reloadly Authentication
  { method: "POST", path: "/api/v1/auth/access-token", description: "Generate a Reloadly access token", category: "Reloadly Authentication" },

  // Reloadly Airtime
  { method: "GET", path: "/api/v1/reload-airtime/token", description: "Generate access token", category: "Reloadly Airtime" },
  { method: "GET", path: "/api/v1/reload-airtime/test", description: "Test endpoint", category: "Reloadly Airtime" },
  { method: "POST", path: "/api/v1/reload-airtime/recharge", description: "Recharge airtime", category: "Reloadly Airtime" },
  { method: "POST", path: "/api/v1/reload-airtime/recharge-async", description: "Recharge airtime asynchronously", category: "Reloadly Airtime" },
  { method: "POST", path: "/api/v1/reload-airtime/phone-lookup", description: "Validate phone number and detect operator (MNP Lookup)", category: "Reloadly Airtime" },
  { method: "GET", path: "/api/v1/reload-airtime/topup-status/{transactionId}", description: "Get Topup Transaction Status", category: "Reloadly Airtime" },

  // Advansis Money
  { method: "GET", path: "/api/v1/advansispay/redirect-url", description: "Handle payment callback", category: "Advansis Money" },
  { method: "POST", path: "/api/v1/advansispay/initiate-payment", description: "Initiate a mobile money payment", category: "Advansis Money" },
  { method: "POST", path: "/api/v1/advansispay/debit-wallet", description: "Process a mobile money transaction", category: "Advansis Money" },
  { method: "POST", path: "/api/v1/advansispay/query-transaction", description: "Query transaction by token", category: "Advansis Money" },
  { method: "POST", path: "/api/v1/advansispay/post-status", description: "Receive payment status update from ExpressPay", category: "Advansis Money" },

  // Reloadly Data
  { method: "GET", path: "/api/v1/reloadly-data/data-test", description: "Health check for Reloadly Data integration", category: "Reloadly Data" },
  { method: "GET", path: "/api/v1/reloadly-data/auto-detect", description: "Auto-detect operator by MSISDN and country code", category: "Reloadly Data" },
  { method: "POST", path: "/api/v1/reloadly-data/list-operators", description: "List data operators by country code", category: "Reloadly Data" },
  { method: "POST", path: "/api/v1/reloadly-data/buy-data", description: "Purchase internet data bundle", category: "Reloadly Data" },
];

export const generateApiDocPDF = async () => {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();

  let yPos = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const maxWidth = pageWidth - (margin * 2);

  // Helper function to add a new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - 20) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  // Title Page
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Lidapay API Documentation", margin, yPos);
  yPos += 15;

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Version 1.0", margin, yPos);
  yPos += 8;

  doc.setFontSize(12);
  doc.text("A secure and scalable API designed to power the Lidapay ecosystem,", margin, yPos);
  yPos += 6;
  doc.text("providing a seamless experience for users across various platforms.", margin, yPos);
  yPos += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Base URL:", margin, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(API_BASE_URL, margin + 25, yPos);
  yPos += 8;

  doc.setFont("helvetica", "bold");
  doc.text("API Documentation:", margin, yPos);
  doc.setFont("helvetica", "normal");
  doc.text("https://api.advansistechnologies.com/api-doc", margin + 40, yPos);
  yPos += 8;

  doc.setFont("helvetica", "bold");
  doc.text("Support Email:", margin, yPos);
  doc.setFont("helvetica", "normal");
  doc.text("support.it@advansistechnologies.com", margin + 35, yPos);
  yPos += 8;

  doc.setFont("helvetica", "bold");
  doc.text("Lead Developer:", margin, yPos);
  doc.setFont("helvetica", "normal");
  doc.text("Hanson Peprah", margin + 35, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(`Generated: ${format(new Date(), "PPP p")}`, margin, yPos);
  yPos += 15;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Lidapay API provides services for airtime, mobile money and internet", margin, yPos);
  yPos += 6;
  doc.text("bundle across networks locally and internationally.", margin, yPos);
  yPos += 15;

  // Table of Contents
  checkPageBreak(30);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Table of Contents", margin, yPos);
  yPos += 10;

  const categories = Array.from(new Set(API_ENDPOINTS.map(e => e.category))).sort();
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  let tocIndex = 1;
  categories.forEach(category => {
    checkPageBreak(8);
    doc.text(`${tocIndex}. ${category}`, margin + 5, yPos);
    yPos += 6;
    tocIndex++;
  });

  // API Endpoints by Category
  categories.forEach(category => {
    checkPageBreak(30);
    yPos += 10;

    // Category Header
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(category, margin, yPos);
    yPos += 8;

    // Draw line under category
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 6;

    // Endpoints in this category
    const endpoints = API_ENDPOINTS.filter(e => e.category === category);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    endpoints.forEach((endpoint, index) => {
      checkPageBreak(15);

      // Method badge
      const methodColors: Record<string, [number, number, number]> = {
        GET: [33, 150, 243],
        POST: [76, 175, 80],
        PUT: [255, 152, 0],
        DELETE: [244, 67, 54],
        PATCH: [156, 39, 176],
      };

      const color = methodColors[endpoint.method] || [100, 100, 100];
      doc.setFillColor(color[0], color[1], color[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      // Use rect instead of roundedRect for better compatibility
      doc.rect(margin, yPos - 4, 12, 5, "F");
      doc.setTextColor(255, 255, 255);
      doc.text(endpoint.method, margin + 6, yPos);
      doc.setTextColor(0, 0, 0);

      // Path
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const fullPath = `${API_BASE_URL}${endpoint.path}`;
      const pathText = doc.splitTextToSize(fullPath, maxWidth - 20);
      doc.text(pathText[0], margin + 15, yPos);
      if (pathText.length > 1) {
        yPos += 4;
        doc.text(pathText[1], margin + 15, yPos);
      }

      yPos += 5;

      // Description
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      const descText = doc.splitTextToSize(endpoint.description, maxWidth - 20);
      doc.text(descText[0], margin + 15, yPos);
      if (descText.length > 1) {
        yPos += 4;
        doc.text(descText[1], margin + 15, yPos);
      }

      yPos += 8;

      // Add spacing between endpoints
      if (index < endpoints.length - 1) {
        yPos += 2;
      }
    });
  });

  // Footer on each page
  const addFooter = (pageNum: number, totalPages: number) => {
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${pageNum} of ${totalPages} | Lidapay API Documentation v1.0 | Powered by Advansis Technologies`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
    doc.setTextColor(0, 0, 0);
  };

  // Add footer to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i, totalPages);
  }

  // Save the PDF
  const filename = `Lidapay_API_Documentation_${format(new Date(), "yyyy-MM-dd")}.pdf`;
  doc.save(filename);
};
