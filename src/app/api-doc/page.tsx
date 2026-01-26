"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateApiDocPDF } from "@/lib/api-doc-pdf";
import { FileText, Download, Loader2 } from "lucide-react";

export default function ApiDocPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      await generateApiDocPDF();
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950 py-16">
      <div className="mx-auto max-w-2xl px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              API Documentation PDF Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Generate a comprehensive PDF document of the Lidapay API documentation
                for sharing with external developers.
              </p>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
                <h3 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-100">
                  What's included:
                </h3>
                <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                  <li>Complete API endpoint listing organized by category</li>
                  <li>HTTP methods, paths, and descriptions</li>
                  <li>Base URL and contact information</li>
                  <li>Professional formatting suitable for external sharing</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Generate API Documentation PDF
                  </>
                )}
              </Button>
              <Link href="/api-docs" className="block">
                <Button variant="secondary" className="w-full" size="lg">
                  <FileText className="mr-2 h-4 w-4" />
                  View Interactive API Documentation
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="font-semibold text-sm mb-2">API Information</h3>
              <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <p>
                  <span className="font-medium">Base URL:</span>{" "}
                  <code className="bg-zinc-100 dark:bg-zinc-900 px-1 rounded">
                    https://api.advansistechnologies.com
                  </code>
                </p>
                <p>
                  <span className="font-medium">API Documentation:</span>{" "}
                  <a
                    href="https://api.advansistechnologies.com/api-doc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:underline dark:text-brand-400"
                  >
                    https://api.advansistechnologies.com/api-doc
                  </a>
                </p>
                <p>
                  <span className="font-medium">Support:</span>{" "}
                  support.it@advansistechnologies.com
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
