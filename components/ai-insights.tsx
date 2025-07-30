"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, RefreshCw, TrendingUp, Clock, Target, Brain, Lightbulb, Zap } from "lucide-react"
import { useStatsStore } from "@/store/stats-store"
import { useTaskStore } from "@/store/task-store"
import { useTimerStore } from "@/store/timer-store"
import { generateProductivityInsights } from "@/lib/ai-providers"
import { AI_PROVIDERS, type AIConfig } from "@/lib/ai-providers"

interface AIInsight {
  id: string
  type: "productivity" | "timing" | "task" | "habit" | "focus" | "break"
  title: string
  description: string
  confidence: number
  icon: React.ReactNode
  actionable: string
}

export function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0)
  const [aiConfig, setAiConfig] = useState<AIConfig>({
    provider: "local",
    apiKey: "",
    model: "algorithmic-v1",
  })

  const { todayStats, weeklyData, dailyStats } = useStatsStore()
  const { tasks } = useTaskStore()
  const { sessionCount, currentSession } = useTimerStore()

  useEffect(() => {
    // Load AI config from localStorage
    const savedConfig = localStorage.getItem("ai-config")
    if (savedConfig) {
      setAiConfig(JSON.parse(savedConfig))
    }
  }, [])

  const generateRealInsights = async () => {
    setIsLoading(true)

    try {
      // Prepare comprehensive data for AI analysis
      const analysisData = {
        todayStats,
        weeklyData,
        recentSessions: dailyStats.slice(-7),
        tasks: tasks.slice(0, 10), // Recent tasks only
        currentSessionCount: sessionCount,
        currentSessionType: currentSession,
        totalTasks: tasks.length,
        completedTasks: tasks.filter((t) => t.status === "done").length,
        activeTasks: tasks.filter((t) => t.status !== "done").length,
        averageTaskCompletion: tasks.length > 0 ? tasks.filter((t) => t.status === "done").length / tasks.length : 0,
        timeOfDay: new Date().getHours(),
        dayOfWeek: new Date().getDay(),
      }

      // Generate AI insights with current config
      const aiInsights = await generateProductivityInsights(analysisData, aiConfig)

      // Add icons to insights
      const insightsWithIcons = aiInsights.map((insight: any) => ({
        ...insight,
        icon: getInsightIcon(insight.type),
      }))

      setInsights(insightsWithIcons)
    } catch (error) {
      console.error("Error generating insights:", error)
      setInsights([])
    }

    setIsLoading(false)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "productivity":
        return <TrendingUp className="w-4 h-4" />
      case "timing":
        return <Clock className="w-4 h-4" />
      case "task":
        return <Target className="w-4 h-4" />
      case "habit":
        return <Lightbulb className="w-4 h-4" />
      case "focus":
        return <Brain className="w-4 h-4" />
      case "break":
        return <Zap className="w-4 h-4" />
      default:
        return <Sparkles className="w-4 h-4" />
    }
  }

  useEffect(() => {
    generateRealInsights()
  }, [todayStats.sessions, tasks.length, aiConfig])

  useEffect(() => {
    if (insights.length > 1) {
      const interval = setInterval(() => {
        setCurrentInsightIndex((prev) => (prev + 1) % insights.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [insights.length])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "productivity":
        return "#00FFFF"
      case "timing":
        return "#7F5AF0"
      case "task":
        return "#FF6B6B"
      case "habit":
        return "#10B981"
      case "focus":
        return "#F59E0B"
      case "break":
        return "#EF4444"
      default:
        return "#00FFFF"
    }
  }

  const currentInsight = insights[currentInsightIndex]
  const currentProvider = AI_PROVIDERS[aiConfig.provider]

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl w-full max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-[#00FFFF]/10">
            <span className="text-lg">{currentProvider.icon}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Productivity Insights</h3>
            <p className="text-sm text-neutral-400">
              Powered by {currentProvider.name} • {insights.length} insights available
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            className={
              aiConfig.provider === "local"
                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                : "bg-green-500/20 text-green-400 border-green-500/30"
            }
          >
            {currentProvider.name}
          </Badge>
          <Button
            onClick={generateRealInsights}
            disabled={isLoading}
            size="sm"
            variant="ghost"
            className="text-neutral-400 hover:text-[#00FFFF] hover:bg-[#00FFFF]/10"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-12"
          >
            <div className="flex items-center space-x-3 text-neutral-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <span className="text-2xl">{currentProvider.icon}</span>
              </motion.div>
              <div>
                <p className="font-medium">Analyzing your productivity patterns...</p>
                <p className="text-sm text-neutral-500">Using {currentProvider.name}</p>
              </div>
            </div>
          </motion.div>
        ) : currentInsight ? (
          <motion.div
            key={currentInsight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-start space-x-4">
              <div
                className="p-3 rounded-xl flex-shrink-0"
                style={{
                  backgroundColor: `${getTypeColor(currentInsight.type)}15`,
                  color: getTypeColor(currentInsight.type),
                }}
              >
                {currentInsight.icon}
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-white text-lg">{currentInsight.title}</h4>
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor: `${getTypeColor(currentInsight.type)}20`,
                      color: getTypeColor(currentInsight.type),
                      borderColor: `${getTypeColor(currentInsight.type)}40`,
                    }}
                  >
                    {currentInsight.confidence}% confidence
                  </Badge>
                </div>

                <p className="text-neutral-300 leading-relaxed">{currentInsight.description}</p>

                <div className="p-3 bg-white/5 rounded-lg border border-neutral-700/40">
                  <p className="text-sm text-[#00FFFF] font-medium mb-1">💡 Actionable Tip:</p>
                  <p className="text-sm text-neutral-300">{currentInsight.actionable}</p>
                </div>
              </div>
            </div>

            {/* Insight Navigation */}
            {insights.length > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-4">
                {insights.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentInsightIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentInsightIndex ? "bg-[#00FFFF] w-8" : "bg-neutral-600 hover:bg-neutral-500 w-2"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="no-insights"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-neutral-500"
          >
            <span className="text-4xl mb-4 block">{currentProvider.icon}</span>
            <p className="text-lg font-medium mb-2">Building your insights...</p>
            <p className="text-sm">Complete a few more sessions to unlock personalized recommendations</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
