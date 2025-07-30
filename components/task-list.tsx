"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Play, Check, Trash2, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTaskStore } from "@/store/task-store"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export function TaskList() {
  const { tasks, currentTask, addTask, toggleTask, deleteTask, setCurrentTask, updateTask } = useTaskStore()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    estimatedPomodoros: 1,
    priority: "medium" as "low" | "medium" | "high" | "urgent",
  })

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask({
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        estimatedPomodoros: newTask.estimatedPomodoros,
        priority: newTask.priority,
      })

      setNewTask({
        title: "",
        description: "",
        estimatedPomodoros: 1,
        priority: "medium",
      })
      setIsAdding(false)

      toast({
        title: "Task added",
        description: "Your task has been added successfully.",
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAddTask()
    } else if (e.key === "Escape") {
      setIsAdding(false)
      setNewTask({
        title: "",
        description: "",
        estimatedPomodoros: 1,
        priority: "medium",
      })
    }
  }

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId)
    toast({
      title: "Task deleted",
      description: "The task has been removed.",
      variant: "destructive",
    })
  }

  const handleToggleTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    toggleTask(taskId)

    if (task?.status !== "done") {
      toast({
        title: "Task completed! 🎉",
        description: "Great job on completing your task!",
      })
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-400 border-red-400/30 bg-red-400/10"
      case "high":
        return "text-orange-400 border-orange-400/30 bg-orange-400/10"
      case "medium":
        return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
      case "low":
        return "text-green-400 border-green-400/30 bg-green-400/10"
      default:
        return "text-neutral-400 border-neutral-400/30 bg-neutral-400/10"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "🔥"
      case "high":
        return "⚡"
      case "medium":
        return "📋"
      case "low":
        return "📝"
      default:
        return "📋"
    }
  }

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-xl font-semibold text-white">Tasks</h3>
          <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">
            {tasks.filter((t) => t.status !== "done").length} active
          </Badge>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          size="sm"
          className="bg-[#7F5AF0] hover:bg-[#7F5AF0]/80 text-white rounded-full"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-white/5 rounded-xl border border-neutral-700/40 space-y-3">
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                  onKeyDown={handleKeyPress}
                  placeholder="Task title..."
                  className="bg-white/5 border-neutral-700/40 text-white placeholder:text-neutral-500"
                  autoFocus
                />

                <Textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Description (optional)..."
                  className="bg-white/5 border-neutral-700/40 text-white placeholder:text-neutral-500 resize-none"
                  rows={2}
                />

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      value={newTask.estimatedPomodoros}
                      onChange={(e) =>
                        setNewTask((prev) => ({ ...prev, estimatedPomodoros: Number.parseInt(e.target.value) || 1 }))
                      }
                      className="w-16 bg-white/5 border-neutral-700/40 text-white text-center"
                    />
                    <span className="text-sm text-neutral-400">pomodoros</span>
                  </div>

                  <Select
                    value={newTask.priority}
                    onValueChange={(value: "low" | "medium" | "high" | "urgent") =>
                      setNewTask((prev) => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger className="w-32 bg-white/5 border-neutral-700/40 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">🟢 Low</SelectItem>
                      <SelectItem value="medium">🟡 Medium</SelectItem>
                      <SelectItem value="high">🟠 High</SelectItem>
                      <SelectItem value="urgent">🔴 Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Button onClick={handleAddTask} size="sm" className="bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-black">
                    Add Task
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAdding(false)
                      setNewTask({
                        title: "",
                        description: "",
                        estimatedPomodoros: 1,
                        priority: "medium",
                      })
                    }}
                    size="sm"
                    variant="ghost"
                    className="text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              layout
              className={cn(
                "p-4 rounded-xl border transition-all duration-300",
                task.status === "done"
                  ? "bg-green-500/10 border-green-500/30"
                  : currentTask?.id === task.id
                    ? "bg-[#00FFFF]/10 border-[#00FFFF]/30 ring-1 ring-[#00FFFF]/20"
                    : "bg-white/5 border-neutral-700/40 hover:bg-white/10",
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Button
                    onClick={() => handleToggleTask(task.id)}
                    size="sm"
                    variant="ghost"
                    className={cn(
                      "w-6 h-6 rounded-full p-0 border-2 transition-all duration-300 mt-1",
                      task.status === "done"
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-neutral-600 hover:border-[#00FFFF]",
                    )}
                  >
                    {task.status === "done" && <Check className="w-3 h-3" />}
                  </Button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4
                        className={cn(
                          "font-medium transition-all duration-300 truncate",
                          task.status === "done" ? "text-neutral-400 line-through" : "text-white",
                        )}
                      >
                        {task.title}
                      </h4>
                      <Badge className={cn("text-xs", getPriorityColor(task.priority))}>
                        {getPriorityIcon(task.priority)} {task.priority}
                      </Badge>
                    </div>

                    {task.description && (
                      <p className="text-sm text-neutral-400 mb-2 line-clamp-2">{task.description}</p>
                    )}

                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="text-xs bg-neutral-800 text-neutral-300">
                        <Clock className="w-3 h-3 mr-1" />
                        {task.actualPomodoros || 0}/{task.estimatedPomodoros}
                      </Badge>

                      {task.status === "in_progress" && (
                        <Badge className="text-xs bg-[#00FFFF]/20 text-[#00FFFF] border-[#00FFFF]/30">
                          <Star className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-2">
                  {task.status !== "done" && (
                    <Button
                      onClick={() => setCurrentTask(task)}
                      size="sm"
                      variant="ghost"
                      className={cn(
                        "w-8 h-8 rounded-full p-0 transition-all duration-300",
                        currentTask?.id === task.id
                          ? "bg-[#00FFFF]/20 text-[#00FFFF]"
                          : "text-neutral-400 hover:text-[#00FFFF] hover:bg-[#00FFFF]/10",
                      )}
                    >
                      <Play className="w-3 h-3" />
                    </Button>
                  )}

                  <Button
                    onClick={() => handleDeleteTask(task.id)}
                    size="sm"
                    variant="ghost"
                    className="w-8 h-8 rounded-full p-0 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {tasks.length === 0 && !isAdding && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-neutral-500">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-800/50 flex items-center justify-center">
              <Plus className="w-8 h-8 text-neutral-600" />
            </div>
            <p className="text-lg font-medium mb-2">No tasks yet</p>
            <p className="text-sm">Add your first task to get started with focused work sessions</p>
          </motion.div>
        )}
      </div>
    </Card>
  )
}
