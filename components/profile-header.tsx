"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Calendar, Trophy, Zap, Target } from "lucide-react"
import { useStatsStore } from "@/store/stats-store"
import { useTaskStore } from "@/store/task-store"
import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { createClient } from "@/lib/supabase-client"
import { useAuth } from "@/components/auth-provider"
import { ProfileSetupDialog } from "@/components/profile-setup-dialog"

export function ProfileHeader() {
  const { todayStats, dailyStats } = useStatsStore()
  const { tasks } = useTaskStore()
  const totalSessions = dailyStats.reduce((acc, day) => acc + day.sessions, 0)
  const totalFocusTime = Math.round(dailyStats.reduce((acc, day) => acc + day.focusTime, 0) / 60)
  const completedTasks = tasks.filter((t) => t.status === "done").length
  const streak = Math.min(dailyStats.filter((day) => day.sessions > 0).length, 30)

  const { user } = useAuth()
  const supabase = useMemo(() => createClient(), [])

  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const [joinDate, setJoinDate] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return
      setEmail(user.email ?? "")
      try {
        const { data, error } = await supabase
          .from("users")
          .select("full_name, avatar_url, created_at")
          .eq("id", user.id)
          .single()
        if (!error && data) {
          setFullName(data.full_name || "")
          setAvatarUrl(data.avatar_url || "")
          setJoinDate(new Date(data.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long" }))
          if (!data.full_name) {
            setDialogOpen(true)
          }
        } else {
          // If profile row doesn't exist yet, prompt setup
          setDialogOpen(true)
        }
      } catch {
        // ignore
      }
    }
    loadProfile()
  }, [supabase, user])

  const level = Math.floor(totalSessions / 10) + 1
  const xp = (totalSessions % 10) * 100
  const nextLevelXp = 1000

  const initials = (fullName || email || "U").split(" ").map((n) => n[0]).join("")

  const handleSave = async (values: { fullName: string; avatarUrl: string }) => {
    if (!user) return
    setFullName(values.fullName)
    setAvatarUrl(values.avatarUrl)
    await supabase.from("users").upsert(
      {
        id: user.id,
        email: user.email,
        full_name: values.fullName,
        avatar_url: values.avatarUrl,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    )
  }

  return (
    <Card className="p-8 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Avatar and Basic Info */}
        <div className="flex items-center space-x-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
            <Avatar className="w-24 h-24 border-4 border-[#00FFFF]/30">
              <AvatarImage src={avatarUrl || "/placeholder.svg"} />
              <AvatarFallback className="bg-[#00FFFF]/10 text-[#00FFFF] text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-[#7F5AF0] text-white text-xs font-bold px-2 py-1 rounded-full">
              L{level}
            </div>
          </motion.div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-white">{fullName || "Set your name"}</h1>
              <Button size="sm" variant="ghost" className="text-neutral-400 hover:text-[#00FFFF]" onClick={() => setDialogOpen(true)}>
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-neutral-400">{email}</p>
            {!!joinDate && (
              <div className="flex items-center space-x-2 text-sm text-neutral-500">
                <Calendar className="w-4 h-4" />
                <span>Member since {joinDate}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center p-4 bg-white/5 rounded-xl border border-neutral-700/40">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-[#00FFFF]" />
            </div>
            <div className="text-2xl font-bold text-white">{totalSessions}</div>
            <div className="text-xs text-neutral-400">Total Sessions</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center p-4 bg-white/5 rounded-xl border border-neutral-700/40">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div className="text-2xl font-bold text-white">{totalFocusTime}h</div>
            <div className="text-xs text-neutral-400">Focus Time</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center p-4 bg-white/5 rounded-xl border border-neutral-700/40">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="text-2xl font-bold text-white">{completedTasks}</div>
            <div className="text-xs text-neutral-400">Tasks Done</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center p-4 bg-white/5 rounded-xl border border-neutral-700/40">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-[#EF4444]" />
            </div>
            <div className="text-2xl font-bold text-white">{streak}</div>
            <div className="text-xs text-neutral-400">Day Streak</div>
          </motion.div>
        </div>
      </div>

      {/* Level Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 pt-6 border-t border-neutral-700/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-neutral-400">Level {level} Progress</span>
          <span className="text-sm text-neutral-400">{xp} / {nextLevelXp} XP</span>
        </div>
        <div className="w-full bg-neutral-800 rounded-full h-2">
          <motion.div className="bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] h-2 rounded-full" initial={{ width: 0 }} animate={{ width: `${(xp / nextLevelXp) * 100}%` }} transition={{ duration: 1, delay: 0.6 }} />
        </div>
      </motion.div>

      <ProfileSetupDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialFullName={fullName}
        initialAvatarUrl={avatarUrl}
        onSave={handleSave}
        title={fullName ? "Edit profile" : "Set up your profile"}
        description={fullName ? "Update your name or avatar." : "Add your name and avatar so your teammates recognize you."}
      />
    </Card>
  )
}
