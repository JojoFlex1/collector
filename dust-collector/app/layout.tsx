import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import WalletProviders from "@/components/wallet-providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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

export const metadata = {
      generator: 'v0.dev'
    };
