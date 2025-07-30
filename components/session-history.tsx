"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, Coffee } from "lucide-react"
import { useStatsStore } from "@/store/stats-store"
import { motion } from "framer-motion"

export function SessionHistory() {
  const { dailyStats } = useStatsStore()
  const recentSessions = dailyStats.slice(-5).reverse()

  const getSessionIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Clock className="w-3 h-3" />
      case "break":
        return <Coffee className="w-3 h-3" />
      default:
        return <CheckCircle className="w-3 h-3" />
    }
  }

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>

      <div className="space-y-3">
        {recentSessions.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-neutral-700/40"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#00FFFF]/10">
                <Clock className="w-4 h-4 text-[#00FFFF]" />
              </div>
              <div>
                <p className="text-white font-medium">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-neutral-400">
                  {day.sessions} sessions • {Math.round(day.focusTime / 60)}h focus
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">
                {day.tasksCompleted} tasks
              </Badge>
            </div>
          </motion.div>
        ))}

        {recentSessions.length === 0 && (
          <div className="text-center py-8 text-neutral-500">
            <Clock className="w-8 h-8 mx-auto mb-2 text-neutral-600" />
            <p>No recent activity</p>
            <p className="text-sm">Start your first session to see history here</p>
          </div>
        )}
      </div>
    </Card>
  )
}
