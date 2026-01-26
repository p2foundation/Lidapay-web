"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ChevronDown, 
  ChevronRight, 
  Copy, 
  Check, 
  Globe, 
  FileText,
  ExternalLink,
  Download
} from "lucide-react";
import { API_EXAMPLES } from "@/lib/api-examples";
import { API_ENDPOINTS, API_BASE_URL } from "@/lib/api-doc-pdf";

interface Endpoint {
  method: string;
  path: string;
  description: string;
  category: string;
}

export default function ApiDocsPage() {
  const [expandedEndpoints, setExpandedEndpoints] = useState<Set<string>>(new Set());
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const toggleEndpoint = (key: string) => {
    const newExpanded = new Set(expandedEndpoints);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedEndpoints(newExpanded);
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(key);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      GET: "bg-blue-500",
      POST: "bg-green-500",
      PUT: "bg-orange-500",
      DELETE: "bg-red-500",
      PATCH: "bg-purple-500",
    };
    return colors[method] || "bg-gray-500";
  };

  const formatPath = (path: string, pathParams?: Record<string, string>) => {
    let formatted = path;
    if (pathParams) {
      Object.entries(pathParams).forEach(([key, value]) => {
        formatted = formatted.replace(`{${key}}`, value);
      });
    }
    return formatted;
  };

  const categories = Array.from(new Set(API_ENDPOINTS.map((e: Endpoint) => e.category))).sort();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 mb-4">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            Lidapay API Documentation
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-6">
            A secure and scalable API designed to power the Lidapay ecosystem, providing seamless 
            airtime, data bundle, and mobile money remittance services.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Base URL:</span>
              <code className="bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">
                {API_BASE_URL}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Version:</span>
              <span>1.0</span>
            </div>
            <a
              href="https://api.advansistechnologies.com/api-doc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              <ExternalLink className="h-4 w-4" />
              Interactive Docs
            </a>
            <Link
              href="/api-doc"
              className="flex items-center gap-1 text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              <Download className="h-4 w-4" />
              Generate PDF
            </Link>
          </div>
        </div>

        {/* API Endpoints by Category */}
        <div className="space-y-8">
          {categories.map((category) => {
            const endpoints = API_ENDPOINTS.filter((e: Endpoint) => e.category === category);
            
            return (
              <Card key={category} className="overflow-hidden">
                <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                  <CardTitle className="text-xl font-bold">{category}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {endpoints.map((endpoint: Endpoint) => {
                      const key = `${endpoint.method} ${endpoint.path}`;
                      const isExpanded = expandedEndpoints.has(key);
                      const example = API_EXAMPLES[key];
                      const fullPath = `${API_BASE_URL}${endpoint.path}`;

                      return (
                        <div key={key} className="transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                          {/* Endpoint Header */}
                          <button
                            onClick={() => toggleEndpoint(key)}
                            className="w-full px-6 py-4 flex items-center gap-4 text-left"
                          >
                            <div className={`${getMethodColor(endpoint.method)} text-white text-xs font-bold px-2 py-1 rounded min-w-[60px] text-center`}>
                              {endpoint.method}
                            </div>
                            <div className="flex-1 min-w-0">
                              <code className="text-sm font-mono text-zinc-900 dark:text-zinc-50 break-all">
                                {endpoint.path}
                              </code>
                              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                                {endpoint.description}
                              </p>
                            </div>
                            {isExpanded ? (
                              <ChevronDown className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                            )}
                          </button>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/30 space-y-6 border-t border-zinc-200 dark:border-zinc-800">
                                  {/* Full URL */}
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                                        Full URL
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyToClipboard(fullPath, `url-${key}`)}
                                        className="h-6 px-2"
                                      >
                                        {copiedText === `url-${key}` ? (
                                          <Check className="h-3 w-3 text-green-600" />
                                        ) : (
                                          <Copy className="h-3 w-3" />
                                        )}
                                      </Button>
                                    </div>
                                    <code className="block bg-zinc-100 dark:bg-zinc-900 px-3 py-2 rounded text-sm break-all">
                                      {fullPath}
                                    </code>
                                  </div>

                                  {/* Request Body */}
                                  {example?.requestBody && (
                                    <div>
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                                          Request Body
                                        </span>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => copyToClipboard(JSON.stringify(example.requestBody, null, 2), `req-${key}`)}
                                          className="h-6 px-2"
                                        >
                                          {copiedText === `req-${key}` ? (
                                            <Check className="h-3 w-3 text-green-600" />
                                          ) : (
                                            <Copy className="h-3 w-3" />
                                          )}
                                        </Button>
                                      </div>
                                      <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-xs">
                                        <code>{JSON.stringify(example.requestBody, null, 2)}</code>
                                      </pre>
                                    </div>
                                  )}

                                  {/* Path Parameters */}
                                  {example?.pathParams && (
                                    <div>
                                      <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-2 block">
                                        Path Parameters
                                      </span>
                                      <div className="bg-zinc-100 dark:bg-zinc-900 px-3 py-2 rounded text-sm">
                                        {Object.entries(example.pathParams).map(([key, value]) => (
                                          <div key={key} className="flex items-center gap-2">
                                            <code className="text-brand-600 dark:text-brand-400">{key}:</code>
                                            <code className="text-zinc-900 dark:text-zinc-50">{value}</code>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Query Parameters */}
                                  {example?.queryParams && (
                                    <div>
                                      <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide mb-2 block">
                                        Query Parameters
                                      </span>
                                      <div className="bg-zinc-100 dark:bg-zinc-900 px-3 py-2 rounded text-sm">
                                        {Object.entries(example.queryParams).map(([key, value]) => (
                                          <div key={key} className="flex items-center gap-2">
                                            <code className="text-brand-600 dark:text-brand-400">{key}:</code>
                                            <code className="text-zinc-900 dark:text-zinc-50">{value}</code>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Response */}
                                  {example?.response && (
                                    <div>
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
                                          Response ({example.response.status})
                                        </span>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => copyToClipboard(JSON.stringify(example.response.body, null, 2), `res-${key}`)}
                                          className="h-6 px-2"
                                        >
                                          {copiedText === `res-${key}` ? (
                                            <Check className="h-3 w-3 text-green-600" />
                                          ) : (
                                            <Copy className="h-3 w-3" />
                                          )}
                                        </Button>
                                      </div>
                                      <div className="mb-2">
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                          example.response.status >= 200 && example.response.status < 300
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                            : example.response.status >= 400
                                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                        }`}>
                                          {example.response.status} {example.response.status === 200 ? "OK" : example.response.status === 201 ? "Created" : example.response.status === 404 ? "Not Found" : ""}
                                        </span>
                                      </div>
                                      <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-xs">
                                        <code>{JSON.stringify(example.response.body, null, 2)}</code>
                                      </pre>
                                    </div>
                                  )}

                                  {/* No Example Available */}
                                  {!example && (
                                    <div className="text-center py-4 text-sm text-zinc-500 dark:text-zinc-400">
                                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                      <p>Example request and response coming soon</p>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p className="mb-2">
            <span className="font-semibold">Support:</span> support.it@advansistechnologies.com
          </p>
          <p>
            <span className="font-semibold">Lead Developer:</span> Hanson Peprah
          </p>
        </div>
      </div>
    </div>
  );
}
