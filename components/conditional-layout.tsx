'use client'

import type React from "react"
import { usePathname } from "next/navigation"
import { BackgroundAnimation } from "@/components/background-animation"
import { OnboardingTour } from "@/components/tutorial/onboarding-tour"
import { Toaster } from "@/components/ui/toaster"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/auth")

  return isAuthPage ? (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E]">
      {children}
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] relative overflow-hidden">
      <BackgroundAnimation />
      <div className="relative z-10">{children}</div>
      <OnboardingTour />
      <Toaster />
    </div>
  )
}
