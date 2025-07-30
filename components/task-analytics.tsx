"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { useTaskStore } from "@/store/task-store"

export function TaskAnalytics() {
  const { tasks } = useTaskStore()

  const statusData = [
    { name: "Completed", value: tasks.filter((t) => t.status === "done").length, color: "#10B981" },
    { name: "In Progress", value: tasks.filter((t) => t.status === "in_progress").length, color: "#00FFFF" },
    { name: "Todo", value: tasks.filter((t) => t.status === "todo").length, color: "#7F5AF0" },
  ]

  const priorityData = [
    { name: "Urgent", value: tasks.filter((t) => t.priority === "urgent").length, color: "#EF4444", icon: "🔥" },
    { name: "High", value: tasks.filter((t) => t.priority === "high").length, color: "#F59E0B", icon: "⚡" },
    { name: "Medium", value: tasks.filter((t) => t.priority === "medium").length, color: "#8B5CF6", icon: "📋" },
    { name: "Low", value: tasks.filter((t) => t.priority === "low").length, color: "#10B981", icon: "📝" },
  ]

  const totalEstimated = tasks.reduce((acc, task) => acc + task.estimatedPomodoros, 0)
  const totalActual = tasks.reduce((acc, task) => acc + task.actualPomodoros, 0)
  const efficiency = totalEstimated > 0 ? Math.round((totalActual / totalEstimated) * 100) : 0

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Task Analytics</h3>
        <p className="text-neutral-400 text-sm">Task distribution and completion patterns</p>
      </div>

      <div className="space-y-6">
        {/* Task Status Distribution */}
        <div>
          <h4 className="text-white font-medium mb-3">Status Distribution</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-2">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-neutral-400">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div>
          <h4 className="text-white font-medium mb-3">Priority Breakdown</h4>
          <div className="space-y-2">
            {priorityData.map((priority) => (
              <div key={priority.name} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{priority.icon}</span>
                  <span className="text-sm text-white">{priority.name}</span>
                </div>
                <Badge
                  className="text-xs"
                  style={{
                    backgroundColor: `${priority.color}20`,
                    color: priority.color,
                    borderColor: `${priority.color}40`,
                  }}
                >
                  {priority.value}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div>
          <h4 className="text-white font-medium mb-3">Efficiency Metrics</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded-lg text-center">
              <div className="text-lg font-bold text-[#00FFFF]">{totalEstimated}</div>
              <div className="text-xs text-neutral-400">Estimated</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg text-center">
              <div className="text-lg font-bold text-[#7F5AF0]">{totalActual}</div>
              <div className="text-xs text-neutral-400">Actual</div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-white/5 rounded-lg text-center">
            <div className="text-2xl font-bold text-white">{efficiency}%</div>
            <div className="text-xs text-neutral-400">Estimation Accuracy</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
