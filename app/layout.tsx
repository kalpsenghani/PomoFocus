import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { BackgroundAnimation } from "@/components/background-animation"
import { OnboardingTour } from "@/components/tutorial/onboarding-tour"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PomoFocus - AI-Powered Productivity Platform",
  description: "Advanced focus and productivity platform with Pomodoro timer, task management, and AI insights",
  manifest: "/manifest.json",
  generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] relative overflow-hidden">
              <BackgroundAnimation />
              <div className="relative z-10">{children}</div>
              <OnboardingTour />
              <Toaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
