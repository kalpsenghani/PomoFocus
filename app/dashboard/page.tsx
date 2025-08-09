"use client"

import { Timer } from "@/components/timer"
import { TaskList } from "@/components/task-list"
import { StatsChart } from "@/components/stats-chart"
import { AIInsights } from "@/components/ai-insights"
import { Navigation } from "@/components/navigation"
import { QuickActions } from "@/components/quick-actions"
import { SessionHistory } from "@/components/session-history"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const { user, loading } = useAuth()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (!loading && !user && !redirecting) {
      setRedirecting(true)
      window.location.href = "/"
    }
  }, [user, loading, redirecting])

  if (loading || redirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00FFFF] mx-auto mb-4"></div>
          <p className="text-neutral-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Focus Dashboard</h1>
            <p className="text-neutral-400 text-lg">Stay focused, stay productive</p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Timer Section - Main Focus */}
            <div className="xl:col-span-8">
              <div className="flex flex-col items-center space-y-8">
                <Timer />
                <QuickActions />
                <AIInsights />
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-4 space-y-6">
              <TaskList />
              <StatsChart />
              <SessionHistory />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
