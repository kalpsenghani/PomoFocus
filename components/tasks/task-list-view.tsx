"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MoreHorizontal, Play, Search, Filter, SortAsc } from "lucide-react"
import { useTaskStore } from "@/store/task-store"
import { cn } from "@/lib/utils"

export function TaskList() {
  const { tasks, updateTask, setCurrentTask } = useTaskStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [sortBy, setSortBy] = useState("created")

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30"
      case "in_progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "done":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30"
    }
  }

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || task.status === filterStatus
      const matchesPriority = filterPriority === "all" || task.priority === filterPriority
      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          return (
            priorityOrder[b.priority as keyof typeof priorityOrder] -
            priorityOrder[a.priority as keyof typeof priorityOrder]
          )
        case "progress":
          const aProgress = a.actualPomodoros / a.estimatedPomodoros
          const bProgress = b.actualPomodoros / b.estimatedPomodoros
          return bProgress - aProgress
        case "created":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card className="p-4 bg-black/20 backdrop-blur-sm border-neutral-700/40">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-neutral-700/40 text-white"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32 bg-white/5 border-neutral-700/40 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-32 bg-white/5 border-neutral-700/40 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 bg-white/5 border-neutral-700/40 text-white">
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredAndSortedTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4 bg-black/20 backdrop-blur-sm border-neutral-700/40 hover:bg-black/30 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  {/* Task Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-white truncate">{task.title}</h4>
                      <Badge className={cn("text-xs", getStatusColor(task.status))}>
                        {task.status.replace("_", " ")}
                      </Badge>
                      <Badge className={cn("text-xs", getPriorityColor(task.priority))}>{task.priority}</Badge>
                    </div>

                    {task.description && (
                      <p className="text-sm text-neutral-400 mb-3 line-clamp-2">{task.description}</p>
                    )}

                    {/* Progress */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span>Progress</span>
                        <span>
                          {task.actualPomodoros}/{task.estimatedPomodoros} pomodoros
                        </span>
                      </div>
                      <Progress value={(task.actualPomodoros / task.estimatedPomodoros) * 100} className="h-2" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-xs text-neutral-500">
                      <Clock className="w-3 h-3" />
                      <span>{task.estimatedPomodoros}p</span>
                    </div>

                    {task.status !== "done" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setCurrentTask(task)}
                        className="text-neutral-400 hover:text-[#00FFFF]"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    )}

                    <Button size="sm" variant="ghost" className="text-neutral-400 hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredAndSortedTasks.length === 0 && (
          <div className="text-center py-12 text-neutral-500">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-800/50 flex items-center justify-center">
              <Search className="w-8 h-8 text-neutral-600" />
            </div>
            <p className="text-lg font-medium mb-2">No tasks found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
