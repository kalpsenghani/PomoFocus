"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, MoreHorizontal, Play } from "lucide-react"
import { useTaskStore } from "@/store/task-store"
import { cn } from "@/lib/utils"

export function TaskKanban() {
  const { tasks, updateTask, setCurrentTask } = useTaskStore()

  const columns = [
    { id: "todo", title: "To Do", color: "#7F5AF0" },
    { id: "in_progress", title: "In Progress", color: "#00FFFF" },
    { id: "done", title: "Done", color: "#10B981" },
  ]

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30"
    }
  }

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData("text/plain")
    updateTask(taskId, { status: status as any })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => (
        <div key={column.id} className="space-y-4" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column.id)}>
          {/* Column Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: column.color }} />
              <h3 className="text-lg font-semibold text-white">{column.title}</h3>
              <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">
                {getTasksByStatus(column.id).length}
              </Badge>
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-3 min-h-[400px]">
            <AnimatePresence>
              {getTasksByStatus(column.id).map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  className="cursor-move"
                >
                  <Card className="p-4 bg-black/20 backdrop-blur-sm border-neutral-700/40 hover:bg-black/30 transition-all duration-300">
                    <div className="space-y-3">
                      {/* Task Header */}
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-white line-clamp-2">{task.title}</h4>
                        <Button size="sm" variant="ghost" className="w-6 h-6 p-0 text-neutral-400 hover:text-white">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Description */}
                      {task.description && <p className="text-sm text-neutral-400 line-clamp-2">{task.description}</p>}

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-neutral-400">
                          <span>Progress</span>
                          <span>
                            {task.actualPomodoros}/{task.estimatedPomodoros}
                          </span>
                        </div>
                        <Progress value={(task.actualPomodoros / task.estimatedPomodoros) * 100} className="h-1" />
                      </div>

                      {/* Task Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={cn("text-xs", getPriorityColor(task.priority))}>{task.priority}</Badge>
                          <div className="flex items-center space-x-1 text-xs text-neutral-500">
                            <Clock className="w-3 h-3" />
                            <span>{task.estimatedPomodoros}p</span>
                          </div>
                        </div>

                        {task.status !== "done" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setCurrentTask(task)}
                            className="w-6 h-6 p-0 text-neutral-400 hover:text-[#00FFFF]"
                          >
                            <Play className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {getTasksByStatus(column.id).length === 0 && (
              <div className="flex items-center justify-center h-32 border-2 border-dashed border-neutral-700/40 rounded-lg">
                <p className="text-neutral-500 text-sm">Drop tasks here</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
