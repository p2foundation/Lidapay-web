export function toText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  // Arrays: join best-effort
  if (Array.isArray(value)) {
    return value.map(toText).filter(Boolean).join(", ");
  }

  // Objects: try common fields first, otherwise JSON
  if (typeof value === "object") {
    const v = value as any;

    // Common API shapes
    if (typeof v.service === "string") return v.service;
    if (typeof v.payment === "string") return v.payment;
    if (typeof v.transaction === "string") return v.transaction;

    if (typeof v.name === "string") return v.name;
    if (typeof v.title === "string") return v.title;
    if (typeof v.description === "string") return v.description;
    if (typeof v.status === "string") return v.status;
    if (typeof v.transType === "string") return v.transType;
    if (typeof v.type === "string") return v.type;
    if (typeof v._id === "string") return v._id;
    if (typeof v.id === "string") return v.id;

    try {
      return JSON.stringify(value);
    } catch {
      return "";
    }
  }

  return "";
}

// Helper function to extract amount from transaction object
export function getTransactionAmount(t: any): number {
  if (!t) return 0;
  
  // Try monetary.amount first (API structure)
  if (t.monetary && typeof t.monetary === "object") {
    if (typeof t.monetary.amount === "number") {
      return t.monetary.amount;
    }
    if (typeof t.monetary.originalAmount === "number") {
      return t.monetary.originalAmount;
    }
    // Try string amounts in monetary object
    if (typeof t.monetary.amount === "string") {
      const parsed = parseFloat(t.monetary.amount);
      if (!isNaN(parsed)) return parsed;
    }
  }
  
  // Try direct amount field (number)
  if (typeof t.amount === "number") {
    return t.amount;
  }
  
  // Try parsing string amount
  if (typeof t.amount === "string") {
    const parsed = parseFloat(t.amount);
    if (!isNaN(parsed)) return parsed;
  }
  
  // Try dataAmount for data transactions
  if (typeof t.dataAmount === "number") {
    return t.dataAmount;
  }
  if (typeof t.dataAmount === "string") {
    const parsed = parseFloat(t.dataAmount);
    if (!isNaN(parsed)) return parsed;
  }
  
  // Try value field
  if (typeof t.value === "number") {
    return t.value;
  }
  if (typeof t.value === "string") {
    const parsed = parseFloat(t.value);
    if (!isNaN(parsed)) return parsed;
  }
  
  return 0;
}

// Helper function to extract currency from transaction object
export function getTransactionCurrency(t: any): string {
  if (!t) return "GHS";
  
  // Try monetary.currency first (API structure)
  if (t.monetary && typeof t.monetary === "object") {
    if (typeof t.monetary.currency === "string") {
      return t.monetary.currency;
    }
  }
  
  // Try direct currency field
  if (typeof t.currency === "string") {
    return t.currency;
  }
  
  return "GHS";
}

export function toDateTimeText(value: unknown): string {
  if (!value) return "—";
  if (value instanceof Date) return value.toLocaleString();
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString();
  }
  return "—";
}

export function formatMoney(amount: unknown, currency = "GHS") {
  const n = typeof amount === "number" ? amount : Number(amount);
  if (!Number.isFinite(n)) return `${currency} —`;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency
    }).format(n);
  } catch {
    return `${currency} ${n.toFixed(2)}`;
  }
}


