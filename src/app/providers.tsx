"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/toaster";
import { PreferencesProvider } from "@/contexts/preferences-context";

export default function Providers({ children }: PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return (
    <QueryClientProvider client={client}>
      <PreferencesProvider>
        {children}
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </PreferencesProvider>
    </QueryClientProvider>
  );
}


