"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"
import { useStatsStore } from "@/store/stats-store"
import { TrendingUp, Clock, Target, Zap } from "lucide-react"

export function StatsChart() {
  const { todayStats, weeklyData } = useStatsStore()

  const chartData = weeklyData.map((day, index) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
    sessions: day.sessions,
    minutes: day.focusTime,
  }))

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Productivity Stats</h3>
        <Badge className="bg-[#7F5AF0]/20 text-[#7F5AF0] border-[#7F5AF0]/30">This Week</Badge>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4 border border-neutral-700/40">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-[#00FFFF]" />
            <span className="text-sm text-neutral-400">Sessions</span>
          </div>
          <div className="text-2xl font-bold text-white">{todayStats.sessions}</div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-neutral-700/40">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-[#7F5AF0]" />
            <span className="text-sm text-neutral-400">Focus Time</span>
          </div>
          <div className="text-2xl font-bold text-white">{Math.round(todayStats.focusTime / 60)}h</div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-neutral-700/40">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-[#FF6B6B]" />
            <span className="text-sm text-neutral-400">Tasks Done</span>
          </div>
          <div className="text-2xl font-bold text-white">{todayStats.tasksCompleted}</div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-neutral-700/40">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-neutral-400">Streak</span>
          </div>
          <div className="text-2xl font-bold text-white">{todayStats.streak}</div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <YAxis hide />
            <Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 6 ? "#00FFFF" : "#7F5AF0"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
