"use client"

import { Timer } from "@/components/timer"
import { TaskList } from "@/components/task-list"
import { StatsChart } from "@/components/stats-chart"
import { AIInsights } from "@/components/ai-insights"
import { Navigation } from "@/components/navigation"
import { QuickActions } from "@/components/quick-actions"
import { SessionHistory } from "@/components/session-history"
import { motion } from "framer-motion"

export default function Home() {
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
