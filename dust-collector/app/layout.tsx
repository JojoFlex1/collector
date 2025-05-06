import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import WalletProviders from "@/components/wallet-providers"
import Script from "next/script"

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="hydration-fix" strategy="beforeInteractive">
          {`
            (function() {
              // Remove attributes added by extensions like Grammarly
              document.addEventListener('DOMContentLoaded', () => {
                const body = document.body;
                if (body.hasAttribute('data-gr-ext-installed')) body.removeAttribute('data-gr-ext-installed');
                if (body.hasAttribute('data-new-gr-c-s-check-loaded')) body.removeAttribute('data-new-gr-c-s-check-loaded');
                if (body.hasAttribute('data-gr-ext-disabled')) body.removeAttribute('data-gr-ext-disabled');
              });
            })();
          `}
        </Script>
      </head>
      <body>
        <WalletProviders>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            {children}
          </ThemeProvider>
        </WalletProviders>
      </body>
    </html>
  )
}
