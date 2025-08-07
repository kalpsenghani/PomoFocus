"use client"

import { Suspense } from "react"
import { BackgroundAnimation } from "@/components/background-animation"
import { LoginForm } from "@/components/auth/login-form"
import { useAuth } from "@/components/auth-provider"
import { useEffect, useState } from "react"

function LoginInner() {
  const { user, loading } = useAuth()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (user && !loading && !redirecting) {
      setRedirecting(true)
      window.location.href = "/dashboard"
    }
  }, [user, loading, redirecting])

  if (loading || redirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00FFFF] mx-auto mb-4"></div>
          <p className="text-neutral-400">Preparing your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] relative overflow-hidden">
      <BackgroundAnimation />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <LoginForm onToggleMode={() => (window.location.href = "/signup")} />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00FFFF]"></div></div>}>
      <LoginInner />
    </Suspense>
  )
}
