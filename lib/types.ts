import type { User } from "@supabase/supabase-js"

export type AuthUser = User | null

export interface UserProfile {
  id: string
  email: string
  full_name?: string | null
  avatar_url?: string | null
  plan: "free" | "pro" | "team"
  created_at: string
  updated_at: string
}

export interface AuthState {
  user: AuthUser
  loading: boolean
}

export interface ApiResponse<T> {
  data?: T
  error?: { message: string; code?: string }
}

export interface SubscriptionInfo {
  plan: "free" | "pro" | "team"
  isActive: boolean
}


