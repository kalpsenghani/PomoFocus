"use client"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

import { Navigation } from "@/components/navigation"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { ProductivityTrends } from "@/components/productivity-trends"
import { TaskAnalytics } from "@/components/task-analytics"
import { TimeDistribution } from "@/components/time-distribution"
import { motion } from "framer-motion"

export default function Analytics() {
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
            <h1 className="text-4xl font-bold text-white">Analytics</h1>
            <p className="text-neutral-400 text-lg">Track your productivity patterns and insights</p>
          </div>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnalyticsOverview />
            <ProductivityTrends />
            <TaskAnalytics />
            <TimeDistribution />
          </div>
        </motion.div>
      </main>
    </div>
  )
}
