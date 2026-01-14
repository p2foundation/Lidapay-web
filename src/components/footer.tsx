"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between">
          {/* Left Section - Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-gradient-to-br from-brand-500 to-indigoBrand-600" />
              <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">LidaPay</span>
            </div>
            <span className="hidden sm:inline text-zinc-400">•</span>
            <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">© {new Date().getFullYear()} All rights reserved</span>
          </div>

          {/* Center Section - Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link 
              href="/privacy" 
              className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Terms
            </Link>
            <Link 
              href="/settings/help" 
              className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Help
            </Link>
          </div>

          {/* Right Section - Google Play Button */}
          <div className="flex items-center">
            <Link 
              href="https://play.google.com/store/apps/details?id=com.advansistechnologies.lidapay&pcampaignid=web_share" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img 
                alt="Get it on Google Play" 
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                className="h-10 sm:h-12 w-auto hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
