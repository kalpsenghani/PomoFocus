"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Plus, Edit, CheckCircle, Clock, Zap } from "lucide-react"
import { useStatsStore } from "@/store/stats-store"
import { motion } from "framer-motion"

interface Goal {
  id: string
  title: string
  description: string
  target: number
  current: number
  unit: string
  period: "daily" | "weekly" | "monthly"
  color: string
  icon: React.ReactNode
  completed: boolean
}

export function ProductivityGoals() {
  const { todayStats, weeklyData } = useStatsStore()

  const weeklyTotal = weeklyData.reduce(
    (acc, day) => ({
      sessions: acc.sessions + day.sessions,
      focusTime: acc.focusTime + day.focusTime,
      tasksCompleted: acc.tasksCompleted + day.tasksCompleted,
    }),
    { sessions: 0, focusTime: 0, tasksCompleted: 0 },
  )

  const goals: Goal[] = [
    {
      id: "daily-sessions",
      title: "Daily Focus Sessions",
      description: "Complete 6 focus sessions today",
      target: 6,
      current: todayStats.sessions,
      unit: "sessions",
      period: "daily",
      color: "#00FFFF",
      icon: <Zap className="w-4 h-4" />,
      completed: todayStats.sessions >= 6,
    },
    {
      id: "daily-focus-time",
      title: "Daily Focus Time",
      description: "Focus for 3 hours today",
      target: 180,
      current: todayStats.focusTime,
      unit: "minutes",
      period: "daily",
      color: "#7F5AF0",
      icon: <Clock className="w-4 h-4" />,
      completed: todayStats.focusTime >= 180,
    },
    {
      id: "weekly-sessions",
      title: "Weekly Sessions",
      description: "Complete 30 sessions this week",
      target: 30,
      current: weeklyTotal.sessions,
      unit: "sessions",
      period: "weekly",
      color: "#10B981",
      icon: <Target className="w-4 h-4" />,
      completed: weeklyTotal.sessions >= 30,
    },
    {
      id: "weekly-tasks",
      title: "Weekly Tasks",
      description: "Complete 20 tasks this week",
      target: 20,
      current: weeklyTotal.tasksCompleted,
      unit: "tasks",
      period: "weekly",
      color: "#F59E0B",
      icon: <CheckCircle className="w-4 h-4" />,
      completed: weeklyTotal.tasksCompleted >= 20,
    },
  ]

  const completedGoals = goals.filter((g) => g.completed).length
  const totalGoals = goals.length

  const formatValue = (value: number, unit: string) => {
    if (unit === "minutes") {
      const hours = Math.floor(value / 60)
      const minutes = value % 60
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    }
    return `${value} ${unit}`
  }

  const formatTarget = (target: number, unit: string) => {
    if (unit === "minutes") {
      const hours = Math.floor(target / 60)
      const minutes = target % 60
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    }
    return `${target} ${unit}`
  }

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Productivity Goals</h3>
          <p className="text-sm text-neutral-400">
            {completedGoals} of {totalGoals} goals completed
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            className={
              completedGoals === totalGoals
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-[#7F5AF0]/20 text-[#7F5AF0] border-[#7F5AF0]/30"
            }
          >
            {Math.round((completedGoals / totalGoals) * 100)}%
          </Badge>
          <Button size="sm" variant="ghost" className="text-neutral-400 hover:text-[#00FFFF]">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              goal.completed
                ? "bg-green-500/5 border-green-500/30"
                : "bg-white/5 border-neutral-700/40 hover:bg-white/10"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{
                    backgroundColor: goal.completed ? "#10B98120" : `${goal.color}20`,
                    color: goal.completed ? "#10B981" : goal.color,
                  }}
                >
                  {goal.completed ? <CheckCircle className="w-4 h-4" /> : goal.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-white">{goal.title}</h4>
                    <Badge variant="secondary" className="text-xs bg-neutral-800 text-neutral-300 capitalize">
                      {goal.period}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-400">{goal.description}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="text-neutral-400 hover:text-white">
                <Edit className="w-3 h-3" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Progress</span>
                <span className="text-white font-medium">
                  {formatValue(goal.current, goal.unit)} / {formatTarget(goal.target, goal.unit)}
                </span>
              </div>
              <Progress
                value={(goal.current / goal.target) * 100}
                className="h-2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              />
            </div>

            {goal.completed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 p-2 bg-green-500/10 rounded-lg border border-green-500/20"
              >
                <p className="text-sm text-green-400 font-medium">🎉 Goal completed!</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-700/40">
        <Button className="w-full bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-black">
          <Plus className="w-4 h-4 mr-2" />
          Add New Goal
        </Button>
      </div>
    </Card>
  )
}
