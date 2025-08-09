"use client"

import { useState } from "react"
import { BackgroundAnimation } from "@/components/background-animation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { Mail, Loader2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setIsLoading(true)
    try {
      await resetPassword(email)
      setMessage("Check your email for a password reset link.")
    } catch (err: any) {
      setError(err?.message || "Unable to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] relative overflow-hidden">
      <BackgroundAnimation />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md p-8 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
          <h1 className="text-2xl font-bold text-white mb-2">Reset your password</h1>
          <p className="text-neutral-400 mb-6">Enter your email and we'll send you a reset link.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-neutral-300">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10 bg-white/5 border-neutral-700/40 text-white placeholder:text-neutral-500" required />
              </div>
            </div>
            {message && <div className="text-sm text-emerald-400">{message}</div>}
            {error && <div className="text-sm text-red-400">{error}</div>}
            <Button type="submit" disabled={isLoading} className="w-full bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-black font-medium">
              {isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>) : ("Send reset link")}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <a href="/login" className="text-[#00FFFF] hover:text-[#00FFFF]/80">Back to login</a>
          </div>
        </Card>
      </div>
    </div>
  )
}


