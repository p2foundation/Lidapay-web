"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Table, FileSpreadsheet, X } from "lucide-react";
import { exportToCSV, exportToJSON, exportToPDF, generateSummaryStats } from "@/lib/export";
import type { Transaction } from "@/lib/export";

interface ExportMenuProps {
  transactions: Transaction[];
  onClose: () => void;
}

export function ExportMenu({ transactions, onClose }: ExportMenuProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExport = async (format: "csv" | "json" | "pdf") => {
    setIsExporting(format);
    try {
      const stats = generateSummaryStats(transactions);
      
      switch (format) {
        case "csv":
          exportToCSV(transactions, "lidapay_transactions");
          break;
        case "json":
          // Create JSON export with summary and transactions
          const jsonData = {
            summary: stats,
            transactions: transactions,
            exportedAt: new Date().toISOString()
          };
          const dataStr = JSON.stringify(jsonData, null, 2);
          const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
          const link = document.createElement("a");
          link.setAttribute("href", dataUri);
          link.setAttribute("download", `lidapay_transactions_${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          break;
        case "pdf":
          await exportToPDF(transactions, "lidapay_transactions");
          break;
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(null);
      onClose();
    }
  };

  const stats = generateSummaryStats(transactions);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Transactions
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Summary Stats */}
            <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900 p-4 space-y-2">
              <h4 className="text-sm font-semibold">Export Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Transactions:</span>
                  <span className="ml-2 font-medium">{stats.totalTransactions}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="ml-2 font-medium">${stats.totalAmount.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Success Rate:</span>
                  <span className="ml-2 font-medium">{stats.successRate}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Average:</span>
                  <span className="ml-2 font-medium">${stats.averageTransaction.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Choose Format</h4>
              
              <Button
                variant="secondary"
                className="w-full justify-start h-auto p-4"
                onClick={() => handleExport("csv")}
                disabled={isExporting !== null}
              >
                <FileSpreadsheet className="h-5 w-5 mr-3 text-green-600" />
                <div className="text-left">
                  <div className="font-medium">CSV</div>
                  <div className="text-xs text-muted-foreground">
                    Excel-compatible spreadsheet
                  </div>
                </div>
                {isExporting === "csv" && (
                  <div className="ml-auto">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                )}
              </Button>

              <Button
                variant="secondary"
                className="w-full justify-start h-auto p-4"
                onClick={() => handleExport("json")}
                disabled={isExporting !== null}
              >
                <Table className="h-5 w-5 mr-3 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">JSON</div>
                  <div className="text-xs text-muted-foreground">
                    Raw data with full details
                  </div>
                </div>
                {isExporting === "json" && (
                  <div className="ml-auto">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                )}
              </Button>

              <Button
                variant="secondary"
                className="w-full justify-start h-auto p-4"
                onClick={() => handleExport("pdf")}
                disabled={isExporting !== null}
              >
                <FileText className="h-5 w-5 mr-3 text-red-600" />
                <div className="text-left">
                  <div className="font-medium">PDF</div>
                  <div className="text-xs text-muted-foreground">
                    Printable report format
                  </div>
                </div>
                {isExporting === "pdf" && (
                  <div className="ml-auto">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                )}
              </Button>
            </div>

            {/* Tips */}
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-3">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                💡 Tip: CSV format is best for Excel, JSON for developers, and PDF for sharing reports.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
