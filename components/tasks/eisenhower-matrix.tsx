"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Play, MoreHorizontal } from "lucide-react"
import { useTaskStore } from "@/store/task-store"

export function EisenhowerMatrix() {
  const { tasks, setCurrentTask } = useTaskStore()

  const getQuadrantTasks = (urgent: boolean, important: boolean) => {
    return tasks.filter((task) => {
      const isUrgent = task.priority === "urgent" || task.priority === "high"
      const isImportant = task.estimatedPomodoros >= 3 || task.status === "in_progress"

      if (urgent && important) return isUrgent && isImportant
      if (urgent && !important) return isUrgent && !isImportant
      if (!urgent && important) return !isUrgent && isImportant
      if (!urgent && !important) return !isUrgent && !isImportant

      return false
    })
  }

  const quadrants = [
    {
      id: "urgent-important",
      title: "Do First",
      subtitle: "Urgent & Important",
      color: "#EF4444",
      tasks: getQuadrantTasks(true, true),
      description: "Crisis, emergencies, deadline-driven projects",
    },
    {
      id: "not-urgent-important",
      title: "Schedule",
      subtitle: "Not Urgent & Important",
      color: "#10B981",
      tasks: getQuadrantTasks(false, true),
      description: "Prevention, planning, development, research",
    },
    {
      id: "urgent-not-important",
      title: "Delegate",
      subtitle: "Urgent & Not Important",
      color: "#F59E0B",
      tasks: getQuadrantTasks(true, false),
      description: "Interruptions, some calls, some emails",
    },
    {
      id: "not-urgent-not-important",
      title: "Eliminate",
      subtitle: "Not Urgent & Not Important",
      color: "#6B7280",
      tasks: getQuadrantTasks(false, false),
      description: "Time wasters, some calls, trivial activities",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {quadrants.map((quadrant, index) => (
        <motion.div
          key={quadrant.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 h-[500px] flex flex-col">
            {/* Quadrant Header */}
            <div className="mb-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: quadrant.color }} />
                <h3 className="text-xl font-semibold text-white">{quadrant.title}</h3>
                <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">
                  {quadrant.tasks.length}
                </Badge>
              </div>
              <p className="text-sm font-medium text-neutral-300 mb-1">{quadrant.subtitle}</p>
              <p className="text-xs text-neutral-500">{quadrant.description}</p>
            </div>

            {/* Tasks */}
            <div className="flex-1 space-y-3 overflow-y-auto">
              <AnimatePresence>
                {quadrant.tasks.map((task, taskIndex) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: taskIndex * 0.05 }}
                  >
                    <Card className="p-3 bg-white/5 border-neutral-700/40 hover:bg-white/10 transition-all duration-300">
                      <div className="space-y-2">
                        {/* Task Header */}
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-white text-sm line-clamp-2 flex-1">{task.title}</h4>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-6 h-6 p-0 text-neutral-400 hover:text-white ml-2"
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </div>

                        {/* Description */}
                        {task.description && (
                          <p className="text-xs text-neutral-400 line-clamp-2">{task.description}</p>
                        )}

                        {/* Progress */}
                        <div className="space-y-1">
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
                            <Badge
                              className="text-xs"
                              style={{
                                backgroundColor: `${quadrant.color}20`,
                                color: quadrant.color,
                                borderColor: `${quadrant.color}40`,
                              }}
                            >
                              {task.priority}
                            </Badge>
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
                              className="w-5 h-5 p-0 text-neutral-400 hover:text-[#00FFFF]"
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
              {quadrant.tasks.length === 0 && (
                <div className="flex items-center justify-center h-32 border-2 border-dashed border-neutral-700/40 rounded-lg">
                  <p className="text-neutral-500 text-sm text-center">No {quadrant.title.toLowerCase()} tasks</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
