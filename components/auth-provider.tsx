"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"
import type { User } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signUp: (email: string, password: string, fullName?: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
  deleteAccount: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log("Getting initial session...")
        const { data: { session } } = await supabase.auth.getSession()
        console.log("Initial session:", session?.user?.email, "Session exists:", !!session)
        setUser(session?.user ?? null)
        setLoading(false)
      } catch (error) {
        console.error("Error getting initial session:", error)
        setUser(null)
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session?.user?.email, "Session:", !!session)
      if (event === "SIGNED_OUT") {
        setUser(null)
        setLoading(false)
        return
      }
      setUser(session?.user ?? null)
      setLoading(false)

      // Create user profile on signup/signin
      if ((event === "SIGNED_IN" || event === "USER_UPDATED") && session?.user) {
        await createUserProfile(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, mounted])

  const createUserProfile = async (user: User) => {
    try {
      const { error } = await supabase.from("profiles").insert([
        {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || "",
          avatar_url: user.user_metadata?.avatar_url || "",
          plan: "free",
        },
      ])

      if (error) {
        console.error("Error creating user profile:", error)
      }
    } catch (error) {
      console.error("Error creating user profile:", error)
    }
  }

  const signIn = async (email: string, password: string) => {
    console.log("Signing in with email:", email)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    console.log("Sign in successful:", data.user?.email)
  }

  const signInWithGoogle = async () => {
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/login` : undefined
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || "",
        },
        emailRedirectTo: redirectTo,
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    try {
      // Optimistically clear user for immediate UI feedback
      setUser(null)
      const { error } = await supabase.auth.signOut({ scope: "local" })
      if (error) throw error
      // Also attempt global signout to clear refresh tokens across tabs
      await supabase.auth.signOut()
    } catch (e) {
      console.error("Sign out error:", e)
    }
  }

  const resetPassword = async (email: string) => {
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/reset-password` : undefined
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    if (error) throw error
  }

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
  }

  const deleteAccount = async () => {
    if (!user) throw new Error("No user logged in")

    try {
      // Delete user data from our tables
      await supabase.from("tasks").delete().eq("user_id", user.id)
      await supabase.from("sessions").delete().eq("user_id", user.id)
      await supabase.from("productivity_stats").delete().eq("user_id", user.id)
      await supabase.from("ai_insights").delete().eq("user_id", user.id)
      await supabase.from("users").delete().eq("id", user.id)

      // Delete auth user (this will also trigger our database cleanup)
      const { error } = await supabase.auth.admin.deleteUser(user.id)
      if (error) throw error
    } catch (error) {
      console.error("Error deleting account:", error)
      throw error
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <AuthContext.Provider value={{ user: null, loading: true, signIn, signInWithGoogle, signUp, signOut, resetPassword, updatePassword, deleteAccount }}>
        {children}
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGoogle, signUp, signOut, resetPassword, updatePassword, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
