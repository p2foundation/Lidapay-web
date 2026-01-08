import { format, subDays, startOfDay, endOfDay } from "date-fns";

export interface Transaction {
  _id?: string;
  id?: string;
  recipientName?: string;
  description?: string;
  transType?: string;
  type?: string;
  status?: string;
  amount?: number;
  currency?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const exportToCSV = (transactions: Transaction[], filename: string = "transactions") => {
  // Define CSV headers
  const headers = [
    "Date",
    "Recipient Name",
    "Description",
    "Type",
    "Status",
    "Amount",
    "Currency",
    "Transaction ID"
  ];

  // Convert transactions to CSV rows
  const csvRows = transactions.map(tx => [
    tx.createdAt ? new Date(tx.createdAt).toLocaleString() : "",
    tx.recipientName || "",
    tx.description || "",
    tx.transType || tx.type || "",
    tx.status || "",
    tx.amount?.toString() || "0",
    tx.currency || "GHS",
    tx._id || tx.id || ""
  ]);

  // Create CSV content
  const csvContent = [
    headers.join(","),
    ...csvRows.map(row => row.map(cell => `"${cell}"`).join(","))
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${format(new Date(), "yyyy-MM-dd_HH-mm-ss")}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (transactions: Transaction[], filename: string = "transactions") => {
  const dataStr = JSON.stringify(transactions, null, 2);
  const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const link = document.createElement("a");
  link.setAttribute("href", dataUri);
  link.setAttribute("download", `${filename}_${format(new Date(), "yyyy-MM-dd_HH-mm-ss")}.json`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = async (transactions: Transaction[], filename: string = "transactions") => {
  // Dynamically import jsPDF to avoid SSR issues
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text("Transaction Report", 14, 20);

  // Add date range
  doc.setFontSize(12);
  doc.text(`Generated: ${format(new Date(), "PPP p")}`, 14, 30);

  // Add table headers
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  const headers = ["Date", "Recipient", "Type", "Status", "Amount"];
  let yPos = 45;
  
  headers.forEach((header, index) => {
    doc.text(header, 14 + (index * 35), yPos);
  });

  // Add transactions
  doc.setFont("helvetica", "normal");
  yPos += 10;

  transactions.forEach((tx, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }

    const row = [
      tx.createdAt ? format(new Date(tx.createdAt), "MM/dd/yy") : "",
      (tx.recipientName || "").substring(0, 15),
      (tx.transType || tx.type || "").substring(0, 10),
      tx.status || "",
      `${tx.currency || "GHS"} ${tx.amount?.toFixed(2) || "0.00"}`
    ];

    row.forEach((cell, cellIndex) => {
      doc.text(cell || "", 14 + (cellIndex * 35), yPos);
    });

    yPos += 8;
  });

  // Save the PDF
  doc.save(`${filename}_${format(new Date(), "yyyy-MM-dd_HH-mm-ss")}.pdf`);
};

export const generateSummaryStats = (transactions: Transaction[]) => {
  const totalAmount = transactions.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
  const successfulTxs = transactions.filter(tx => tx.status === "success").length;
  const failedTxs = transactions.filter(tx => tx.status === "failed").length;
  const pendingTxs = transactions.filter(tx => tx.status === "pending").length;
  const successRate = transactions.length > 0 ? (successfulTxs / transactions.length) * 100 : 0;

  // Group by type
  const byType = transactions.reduce((acc, tx) => {
    const type = tx.transType || tx.type || "Other";
    if (!acc[type]) acc[type] = { count: 0, amount: 0 };
    acc[type].count++;
    acc[type].amount += Number(tx.amount) || 0;
    return acc;
  }, {} as Record<string, { count: number; amount: number }>);

  // Group by status
  const byStatus = {
    success: successfulTxs,
    failed: failedTxs,
    pending: pendingTxs
  };

  return {
    totalTransactions: transactions.length,
    totalAmount,
    successRate: successRate.toFixed(2),
    byType,
    byStatus,
    averageTransaction: transactions.length > 0 ? totalAmount / transactions.length : 0
  };
};
