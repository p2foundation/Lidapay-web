import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";
import Providers from "./providers";
import { RouteLoader } from "@/components/route-loader";
import { Toaster } from "@/components/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lidapay Web",
  description: "Lidapay is a global platform for international Airtime and Internet Data remittance, available on both web and mobile apps.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <RouteLoader />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}


