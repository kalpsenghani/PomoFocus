"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { BackgroundAnimation } from "@/components/background-animation"
import { useAuth } from "@/components/auth-provider"

function AuthPageInner() {
  const [isLogin, setIsLogin] = useState(true)
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isRedirecting, setIsRedirecting] = useState(false)

  // Sync mode with URL param (?mode=login|signup)
  useEffect(() => {
    const mode = searchParams.get("mode")
    if (mode === "signup") setIsLogin(false)
    if (mode === "login") setIsLogin(true)
  }, [searchParams])

  // Redirect to dashboard if user is authenticated
  useEffect(() => {
    if (user && !loading && !isRedirecting) {
      console.log("User authenticated, redirecting to dashboard")
      setIsRedirecting(true)
      // Use setTimeout to ensure state updates before redirect
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 100)
    }
  }, [user, loading, isRedirecting])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#00FFFF]"></div>
      </div>
    )
  }

  // If user is authenticated and we're redirecting, show loading
  if (user && isRedirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00FFFF] mx-auto mb-4"></div>
          <p className="text-neutral-400">Redirecting to dashboard...</p>
          <p className="text-xs text-neutral-500 mt-2">User: {user.email}</p>
          <button 
            onClick={() => window.location.href = "/dashboard"}
            className="mt-4 px-4 py-2 bg-[#00FFFF] text-black rounded-lg hover:bg-[#00FFFF]/80"
          >
            Click here if not redirected automatically
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] relative overflow-hidden">
      <BackgroundAnimation />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <SignupForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00FFFF]"></div></div>}>
      <AuthPageInner />
    </Suspense>
  )
}
