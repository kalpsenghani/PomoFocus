"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { useStatsStore } from "@/store/stats-store"

export function ProductivityTrends() {
  const { weeklyData } = useStatsStore()

  const chartData = weeklyData.map((day, index) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
    sessions: day.sessions,
    focusTime: Math.round(day.focusTime / 60), // Convert to hours
    efficiency: day.sessions > 0 ? Math.round((day.focusTime / (day.sessions * 25)) * 100) : 0,
  }))

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Productivity Trends</h3>
        <p className="text-neutral-400 text-sm">Weekly focus patterns and efficiency</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "white",
              }}
            />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="#00FFFF"
              strokeWidth={3}
              dot={{ fill: "#00FFFF", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#00FFFF", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="focusTime"
              stroke="#7F5AF0"
              strokeWidth={3}
              dot={{ fill: "#7F5AF0", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#7F5AF0", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#00FFFF] rounded-full"></div>
          <span className="text-sm text-neutral-400">Sessions</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#7F5AF0] rounded-full"></div>
          <span className="text-sm text-neutral-400">Focus Hours</span>
        </div>
      </div>
    </Card>
  )
}
