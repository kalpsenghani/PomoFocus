"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Target, Zap, Calendar, Award } from "lucide-react"
import { useStatsStore } from "@/store/stats-store"
import { useTaskStore } from "@/store/task-store"
import { motion } from "framer-motion"

export function AnalyticsOverview() {
  const { todayStats, weeklyData, dailyStats } = useStatsStore()
  const { tasks } = useTaskStore()

  const weeklyTotal = weeklyData.reduce(
    (acc, day) => ({
      sessions: acc.sessions + day.sessions,
      focusTime: acc.focusTime + day.focusTime,
      tasksCompleted: acc.tasksCompleted + day.tasksCompleted,
    }),
    { sessions: 0, focusTime: 0, tasksCompleted: 0 },
  )

  const averageDaily = {
    sessions: Math.round(weeklyTotal.sessions / 7),
    focusTime: Math.round(weeklyTotal.focusTime / 7),
    tasksCompleted: Math.round(weeklyTotal.tasksCompleted / 7),
  }

  const completionRate =
    tasks.length > 0 ? Math.round((tasks.filter((t) => t.status === "done").length / tasks.length) * 100) : 0
  const streak = Math.min(dailyStats.filter((day) => day.sessions > 0).length, 30)

  const stats = [
    {
      title: "Today's Focus",
      value: `${Math.round(todayStats.focusTime / 60)}h ${todayStats.focusTime % 60}m`,
      subtitle: `${todayStats.sessions} sessions completed`,
      icon: <Clock className="w-5 h-5" />,
      color: "#00FFFF",
      trend: "+12%",
    },
    {
      title: "Weekly Average",
      value: `${Math.round(averageDaily.focusTime / 60)}h ${averageDaily.focusTime % 60}m`,
      subtitle: `${averageDaily.sessions} sessions per day`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "#7F5AF0",
      trend: "+8%",
    },
    {
      title: "Task Completion",
      value: `${completionRate}%`,
      subtitle: `${tasks.filter((t) => t.status === "done").length} of ${tasks.length} tasks`,
      icon: <Target className="w-5 h-5" />,
      color: "#10B981",
      trend: "+15%",
    },
    {
      title: "Current Streak",
      value: `${streak} days`,
      subtitle: "Consecutive active days",
      icon: <Award className="w-5 h-5" />,
      color: "#F59E0B",
      trend: "+3 days",
    },
    {
      title: "This Month",
      value: `${Math.round((weeklyTotal.focusTime * 4) / 60)}h`,
      subtitle: `${weeklyTotal.sessions * 4} total sessions`,
      icon: <Calendar className="w-5 h-5" />,
      color: "#EF4444",
      trend: "+22%",
    },
    {
      title: "Productivity Score",
      value: "87%",
      subtitle: "Above average performance",
      icon: <Zap className="w-5 h-5" />,
      color: "#8B5CF6",
      trend: "+5%",
    },
  ]

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Analytics Overview</h3>
          <p className="text-neutral-400 text-sm">Your productivity metrics at a glance</p>
        </div>
        <Badge className="bg-[#00FFFF]/20 text-[#00FFFF] border-[#00FFFF]/30">This Week</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white/5 rounded-xl border border-neutral-700/40 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                {stat.trend}
              </Badge>
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
              <p className="text-sm text-neutral-400">{stat.subtitle}</p>
              <p className="text-xs text-neutral-500 font-medium">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
