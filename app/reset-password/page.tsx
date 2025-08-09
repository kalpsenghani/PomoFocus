"use client"

import { useState } from "react"
import { BackgroundAnimation } from "@/components/background-animation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { Lock, Loader2 } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { updatePassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }
    setIsLoading(true)
    try {
      await updatePassword(password)
      setSuccess(true)
      setTimeout(() => (window.location.href = "/login"), 1200)
    } catch (err: any) {
      setError(err?.message || "Unable to update password. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] relative overflow-hidden">
      <BackgroundAnimation />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md p-8 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
          <h1 className="text-2xl font-bold text-white mb-2">Set a new password</h1>
          <p className="text-neutral-400 mb-6">Enter your new password below.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-neutral-300">New password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 bg-white/5 border-neutral-700/40 text-white placeholder:text-neutral-500" required />
              </div>
            </div>
            <div>
              <Label htmlFor="confirm" className="text-neutral-300">Confirm password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" className="pl-10 bg-white/5 border-neutral-700/40 text-white placeholder:text-neutral-500" required />
              </div>
            </div>
            {error && <div className="text-sm text-red-400">{error}</div>}
            {success && <div className="text-sm text-emerald-400">Password updated. Redirecting…</div>}
            <Button type="submit" disabled={isLoading} className="w-full bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-black font-medium">
              {isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating…</>) : ("Update password")}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}


