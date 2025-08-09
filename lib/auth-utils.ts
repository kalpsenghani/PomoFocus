import { createSupabaseServerClient } from "@/lib/supabase-server"
import type { SubscriptionInfo } from "@/lib/types"

export async function getServerUser() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function requireServerUser(): Promise<NonNullable<Awaited<ReturnType<typeof getServerUser>>>> {
  const user = await getServerUser()
  if (!user) throw new Error("UNAUTHENTICATED")
  return user
}

export async function getSubscriptionStatus(userId: string): Promise<SubscriptionInfo> {
  // Read from profiles.plan
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from("profiles").select("plan").eq("id", userId).single()
  const plan = (data?.plan ?? "free") as SubscriptionInfo["plan"]
  return { plan, isActive: plan !== "free" }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function mapAuthError(error: unknown): string {
  const message = (error as any)?.message ?? "Unexpected error. Please try again."
  return String(message)
}


