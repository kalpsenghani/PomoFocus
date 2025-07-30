"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Settings, BarChart3 } from "lucide-react"
import { useTimerStore } from "@/store/timer-store"
import { useTaskStore } from "@/store/task-store"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const { isRunning, startTimer, pauseTimer, resetTimer } = useTimerStore()
  const { tasks, setCurrentTask } = useTaskStore()
  const router = useRouter()

  const uncompletedTasks = tasks.filter((t) => t.status !== "done")
  const nextTask = uncompletedTasks[0]

  const handleQuickStart = () => {
    if (nextTask && !useTaskStore.getState().currentTask) {
      setCurrentTask(nextTask)
    }
    startTimer()
  }

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl w-full max-w-2xl">
      <div className="flex items-center justify-center space-x-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleQuickStart}
            disabled={isRunning}
            className="bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-black font-medium px-6 py-3 rounded-xl"
          >
            <Play className="w-4 h-4 mr-2" />
            Quick Start
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => router.push("/analytics")}
            variant="ghost"
            className="bg-white/5 hover:bg-white/10 text-white border border-neutral-700/40 px-6 py-3 rounded-xl"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => router.push("/settings")}
            variant="ghost"
            className="bg-white/5 hover:bg-white/10 text-white border border-neutral-700/40 px-6 py-3 rounded-xl"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </motion.div>
      </div>

      {nextTask && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-white/5 rounded-lg border border-neutral-700/40 text-center"
        >
          <p className="text-sm text-neutral-400 mb-1">Next up:</p>
          <p className="text-white font-medium">{nextTask.title}</p>
        </motion.div>
      )}
    </Card>
  )
}
