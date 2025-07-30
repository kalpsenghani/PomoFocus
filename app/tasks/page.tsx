"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { TaskKanban } from "@/components/tasks/task-kanban"
import { TaskList } from "@/components/tasks/task-list-view"
import { EisenhowerMatrix } from "@/components/tasks/eisenhower-matrix"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LayoutGrid, List, Grid3X3, Plus } from "lucide-react"
import { motion } from "framer-motion"

type ViewMode = "kanban" | "list" | "matrix"

export default function TasksPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban")

  const getViewIcon = (mode: ViewMode) => {
    switch (mode) {
      case "kanban":
        return <LayoutGrid className="w-4 h-4" />
      case "list":
        return <List className="w-4 h-4" />
      case "matrix":
        return <Grid3X3 className="w-4 h-4" />
    }
  }

  const getViewLabel = (mode: ViewMode) => {
    switch (mode) {
      case "kanban":
        return "Kanban Board"
      case "list":
        return "List View"
      case "matrix":
        return "Eisenhower Matrix"
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Task Management</h1>
              <p className="text-neutral-400 text-lg">Organize and track your productivity</p>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Selector */}
              <Select value={viewMode} onValueChange={(value: ViewMode) => setViewMode(value)}>
                <SelectTrigger className="w-48 bg-white/5 border-neutral-700/40 text-white">
                  <div className="flex items-center space-x-2">
                    {getViewIcon(viewMode)}
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kanban">
                    <div className="flex items-center space-x-2">
                      <LayoutGrid className="w-4 h-4" />
                      <span>Kanban Board</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="list">
                    <div className="flex items-center space-x-2">
                      <List className="w-4 h-4" />
                      <span>List View</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="matrix">
                    <div className="flex items-center space-x-2">
                      <Grid3X3 className="w-4 h-4" />
                      <span>Eisenhower Matrix</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-black">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>

          {/* View Content */}
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === "kanban" && <TaskKanban />}
            {viewMode === "list" && <TaskList />}
            {viewMode === "matrix" && <EisenhowerMatrix />}
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
