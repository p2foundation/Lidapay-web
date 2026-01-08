"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

export function Button({ 
  className, 
  variant = "primary", 
  size = "md", 
  loading = false,
  disabled,
  children,
  ...props 
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-gradient-to-r from-brand-500 to-indigoBrand-600 text-white shadow-glow hover:opacity-95",
        variant === "secondary" &&
          "bg-white/90 text-zinc-900 ring-1 ring-zinc-200 hover:bg-white dark:bg-zinc-900 dark:text-zinc-50 dark:ring-zinc-800",
        variant === "ghost" &&
          "bg-transparent text-zinc-800 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-900",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-4 text-sm",
        size === "lg" && "h-12 px-5 text-base",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}


