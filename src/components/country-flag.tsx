"use client";

import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface CountryFlagProps {
  flagUrl: string;
  countryCode: string;
  size?: number;
  className?: string;
}

export function CountryFlag({ flagUrl, countryCode, size = 32, className = "" }: CountryFlagProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate fallback flag URL from country code
  const fallbackUrl = `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
  const imageUrl = flagUrl || fallbackUrl;

  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 ${className}`}
      style={{ width: size, height: size * 0.75 }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-3 w-3 animate-spin text-zinc-400" />
        </div>
      )}
      {!hasError ? (
        <Image
          src={imageUrl}
          alt={`${countryCode} flag`}
          width={size}
          height={size * 0.75}
          className={`object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          unoptimized
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-zinc-400">
          {countryCode.substring(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
}

