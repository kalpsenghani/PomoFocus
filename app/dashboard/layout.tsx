import type React from "react"
import { redirect } from "next/navigation"
import { getServerUser } from "@/lib/auth-utils"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser()
  if (!user) {
    redirect("/login")
  }
  return <>{children}</>
}


