"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts"
import { useStatsStore } from "@/store/stats-store"

export function TimeDistribution() {
  const { weeklyData } = useStatsStore()

  // Create hourly distribution data (mock data for demonstration)
  const hourlyData = Array.from({ length: 24 }, (_, hour) => {
    // Simulate productivity patterns - higher in morning and afternoon
    let sessions = 0
    if (hour >= 8 && hour <= 11) sessions = Math.floor(Math.random() * 5) + 3
    else if (hour >= 13 && hour <= 17) sessions = Math.floor(Math.random() * 4) + 2
    else if (hour >= 19 && hour <= 22) sessions = Math.floor(Math.random() * 3) + 1
    else sessions = Math.floor(Math.random() * 2)

    return {
      hour: hour.toString().padStart(2, "0") + ":00",
      sessions,
      isPeak: (hour >= 9 && hour <= 11) || (hour >= 14 && hour <= 16),
    }
  })

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl lg:col-span-2">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Time Distribution</h3>
        <p className="text-neutral-400 text-sm">When you're most productive throughout the day</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hourlyData}>
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
              interval={2}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "white",
              }}
            />
            <Bar dataKey="sessions" radius={[2, 2, 0, 0]} fill="#7F5AF0">
              {hourlyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isPeak ? "#00FFFF" : "#7F5AF0"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#7F5AF0] rounded-sm"></div>
          <span className="text-sm text-neutral-400">Regular Hours</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#00FFFF] rounded-sm"></div>
          <span className="text-sm text-neutral-400">Peak Hours</span>
        </div>
      </div>
    </Card>
  )
}
