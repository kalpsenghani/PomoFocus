"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, Target, Zap, Trophy, Calendar } from "lucide-react"
import { useStatsStore } from "@/store/stats-store"
import { useTaskStore } from "@/store/task-store"
import { motion } from "framer-motion"

interface ActivityItem {
  id: string
  type: "session" | "task" | "achievement" | "goal"
  title: string
  description: string
  timestamp: string
  icon: React.ReactNode
  color: string
}

export function ActivityFeed() {
  const { dailyStats } = useStatsStore()
  const { tasks } = useTaskStore()

  // Generate mock activity data based on real stats
  const generateActivities = (): ActivityItem[] => {
    const activities: ActivityItem[] = []

    // Recent task completions
    const completedTasks = tasks.filter((t) => t.status === "done").slice(0, 3)
    completedTasks.forEach((task, index) => {
      activities.push({
        id: `task-${task.id}`,
        type: "task",
        title: "Task Completed",
        description: `Completed "${task.title}"`,
        timestamp: `${index + 1} hour${index !== 0 ? "s" : ""} ago`,
        icon: <CheckCircle className="w-4 h-4" />,
        color: "#10B981",
      })
    })

    // Recent sessions
    if (dailyStats.length > 0) {
      const recentDay = dailyStats[dailyStats.length - 1]
      if (recentDay.sessions > 0) {
        activities.push({
          id: "session-today",
          type: "session",
          title: "Focus Session",
          description: `Completed ${recentDay.sessions} focus session${recentDay.sessions !== 1 ? "s" : ""} today`,
          timestamp: "2 hours ago",
          icon: <Zap className="w-4 h-4" />,
          color: "#00FFFF",
        })
      }
    }

    // Mock achievements
    activities.push(
      {
        id: "achievement-1",
        type: "achievement",
        title: "Achievement Unlocked",
        description: "Earned 'Early Bird' badge for starting before 8 AM",
        timestamp: "1 day ago",
        icon: <Trophy className="w-4 h-4" />,
        color: "#F59E0B",
      },
      {
        id: "goal-1",
        type: "goal",
        title: "Goal Progress",
        description: "Reached 80% of weekly focus time goal",
        timestamp: "2 days ago",
        icon: <Target className="w-4 h-4" />,
        color: "#7F5AF0",
      },
      {
        id: "session-streak",
        type: "session",
        title: "Streak Milestone",
        description: "Maintained 5-day productivity streak",
        timestamp: "3 days ago",
        icon: <Calendar className="w-4 h-4" />,
        color: "#EF4444",
      },
    )

    return activities.sort((a, b) => {
      // Simple timestamp sorting (in real app, use actual dates)
      const timeA = Number.parseInt(a.timestamp.split(" ")[0])
      const timeB = Number.parseInt(b.timestamp.split(" ")[0])
      return timeA - timeB
    })
  }

  const activities = generateActivities()

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "session":
        return "Session"
      case "task":
        return "Task"
      case "achievement":
        return "Achievement"
      case "goal":
        return "Goal"
      default:
        return "Activity"
    }
  }

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          <p className="text-sm text-neutral-400">Your latest productivity milestones</p>
        </div>
        <Badge className="bg-[#00FFFF]/20 text-[#00FFFF] border-[#00FFFF]/30">{activities.length} activities</Badge>
      </div>

      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-neutral-700/40 hover:bg-white/10 transition-all duration-300"
            >
              <div
                className="p-2 rounded-lg flex-shrink-0"
                style={{ backgroundColor: `${activity.color}20`, color: activity.color }}
              >
                {activity.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-white">{activity.title}</h4>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-neutral-800 text-neutral-300"
                    style={{ backgroundColor: `${activity.color}20`, color: activity.color }}
                  >
                    {getTypeLabel(activity.type)}
                  </Badge>
                </div>
                <p className="text-sm text-neutral-400 mb-2">{activity.description}</p>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-neutral-500" />
                  <span className="text-xs text-neutral-500">{activity.timestamp}</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 text-neutral-500">
            <Clock className="w-12 h-12 mx-auto mb-4 text-neutral-600" />
            <p className="text-lg font-medium mb-2">No recent activity</p>
            <p className="text-sm">Complete some tasks or sessions to see your activity here</p>
          </div>
        )}
      </div>

      {activities.length > 0 && (
        <div className="mt-6 pt-4 border-t border-neutral-700/40 text-center">
          <button className="text-sm text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors">
            View All Activity
          </button>
        </div>
      )}
    </Card>
  )
}
