"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Zap, Target, Calendar, Clock, Star, Award, Flame } from "lucide-react"
import { useStatsStore } from "@/store/stats-store"
import { useTaskStore } from "@/store/task-store"
import { motion } from "framer-motion"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  unlocked: boolean
  progress?: number
  maxProgress?: number
  unlockedAt?: string
}

export function AchievementsBadges() {
  const { dailyStats, todayStats } = useStatsStore()
  const { tasks } = useTaskStore()

  const totalSessions = dailyStats.reduce((acc, day) => acc + day.sessions, 0)
  const totalFocusTime = dailyStats.reduce((acc, day) => acc + day.focusTime, 0)
  const completedTasks = tasks.filter((t) => t.status === "done").length
  const streak = Math.min(dailyStats.filter((day) => day.sessions > 0).length, 7)

  const achievements: Achievement[] = [
    {
      id: "first-session",
      title: "Getting Started",
      description: "Complete your first focus session",
      icon: <Zap className="w-5 h-5" />,
      color: "#00FFFF",
      unlocked: totalSessions >= 1,
      unlockedAt: totalSessions >= 1 ? "2 days ago" : undefined,
    },
    {
      id: "early-bird",
      title: "Early Bird",
      description: "Start a session before 8 AM",
      icon: <Clock className="w-5 h-5" />,
      color: "#F59E0B",
      unlocked: true, // Mock data
      unlockedAt: "1 week ago",
    },
    {
      id: "focus-master",
      title: "Focus Master",
      description: "Complete 25 focus sessions",
      icon: <Target className="w-5 h-5" />,
      color: "#10B981",
      unlocked: totalSessions >= 25,
      progress: Math.min(totalSessions, 25),
      maxProgress: 25,
      unlockedAt: totalSessions >= 25 ? "3 days ago" : undefined,
    },
    {
      id: "task-crusher",
      title: "Task Crusher",
      description: "Complete 50 tasks",
      icon: <Trophy className="w-5 h-5" />,
      color: "#7F5AF0",
      unlocked: completedTasks >= 50,
      progress: Math.min(completedTasks, 50),
      maxProgress: 50,
    },
    {
      id: "consistency-king",
      title: "Consistency King",
      description: "Maintain a 7-day streak",
      icon: <Flame className="w-5 h-5" />,
      color: "#EF4444",
      unlocked: streak >= 7,
      progress: Math.min(streak, 7),
      maxProgress: 7,
    },
    {
      id: "marathon-runner",
      title: "Marathon Runner",
      description: "Focus for 10 hours in total",
      icon: <Award className="w-5 h-5" />,
      color: "#8B5CF6",
      unlocked: totalFocusTime >= 600, // 10 hours in minutes
      progress: Math.min(totalFocusTime, 600),
      maxProgress: 600,
    },
    {
      id: "perfectionist",
      title: "Perfectionist",
      description: "Complete all tasks in a day",
      icon: <Star className="w-5 h-5" />,
      color: "#06B6D4",
      unlocked: false, // Mock data
      progress: 0,
      maxProgress: 1,
    },
    {
      id: "weekend-warrior",
      title: "Weekend Warrior",
      description: "Stay productive on weekends",
      icon: <Calendar className="w-5 h-5" />,
      color: "#F97316",
      unlocked: true, // Mock data
      unlockedAt: "5 days ago",
    },
  ]

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const lockedAchievements = achievements.filter((a) => !a.unlocked)

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Achievements</h3>
          <p className="text-sm text-neutral-400">
            {unlockedAchievements.length} of {achievements.length} unlocked
          </p>
        </div>
        <Badge className="bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30">
          {Math.round((unlockedAchievements.length / achievements.length) * 100)}% Complete
        </Badge>
      </div>

      <div className="space-y-6">
        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-white font-medium flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-[#F59E0B]" />
              <span>Unlocked ({unlockedAchievements.length})</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {unlockedAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 rounded-xl border border-neutral-700/40 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${achievement.color}20`, color: achievement.color }}
                    >
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-white truncate">{achievement.title}</h5>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">✓</Badge>
                      </div>
                      <p className="text-sm text-neutral-400 mb-2">{achievement.description}</p>
                      {achievement.unlockedAt && (
                        <p className="text-xs text-neutral-500">Unlocked {achievement.unlockedAt}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-white font-medium flex items-center space-x-2">
              <Target className="w-4 h-4 text-neutral-400" />
              <span>In Progress ({lockedAchievements.length})</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lockedAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (unlockedAchievements.length + index) * 0.1 }}
                  className="p-4 bg-white/5 rounded-xl border border-neutral-700/40 opacity-75 hover:opacity-100 transition-all duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-neutral-700/50 text-neutral-500 flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-neutral-300 truncate mb-1">{achievement.title}</h5>
                      <p className="text-sm text-neutral-500 mb-2">{achievement.description}</p>
                      {achievement.progress !== undefined && achievement.maxProgress && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-neutral-500">
                            <span>Progress</span>
                            <span>
                              {achievement.progress} / {achievement.maxProgress}
                            </span>
                          </div>
                          <div className="w-full bg-neutral-800 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full transition-all duration-500"
                              style={{
                                width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                                backgroundColor: achievement.color,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
