"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTimerStore } from "@/store/timer-store"
import { useTaskStore } from "@/store/task-store"
import { useNotificationStore } from "@/store/notification-store"
import { cn } from "@/lib/utils"

export function TimerWithShadows() {
  const { timeLeft, isRunning, currentSession, sessionCount, settings, startTimer, pauseTimer, resetTimer, tick } =
    useTimerStore()
  const { currentTask } = useTaskStore()
  const { playSound, showNotification, vibrate } = useNotificationStore()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        tick()
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, tick])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getSessionColor = () => {
    switch (currentSession) {
      case "work":
        return "#00FF00" // Green for work
      case "shortBreak":
        return "#0080FF" // Blue for short break
      case "longBreak":
        return "#FFD700" // Yellow for long break
      default:
        return "#00FF00"
    }
  }

  const getShadowColor = () => {
    if (!isRunning) return "#FF0000" // Red when paused
    return getSessionColor()
  }

  const getSessionLabel = () => {
    switch (currentSession) {
      case "work":
        return "Focus Time"
      case "shortBreak":
        return "Short Break"
      case "longBreak":
        return "Long Break"
      default:
        return "Focus Time"
    }
  }

  const progress =
    currentSession === "work"
      ? ((settings.workDuration * 60 - timeLeft) / (settings.workDuration * 60)) * 100
      : currentSession === "shortBreak"
        ? ((settings.shortBreakDuration * 60 - timeLeft) / (settings.shortBreakDuration * 60)) * 100
        : ((settings.longBreakDuration * 60 - timeLeft) / (settings.longBreakDuration * 60)) * 100

  const handleStartPause = () => {
    if (isRunning) {
      pauseTimer()
      playSound("pause")
      vibrate([100])
    } else {
      startTimer()
      playSound("start")
      vibrate([200])
    }
  }

  const handleReset = () => {
    resetTimer()
    playSound("reset")
    vibrate([100, 100, 100])
  }

  return (
    <Card className="p-8 bg-black/20 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
      <div className="flex flex-col items-center space-y-8">
        {/* Session Info */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{getSessionLabel()}</h2>
          <p className="text-neutral-400">
            Session {sessionCount} • {currentTask ? `Working on: ${currentTask.title}` : "No task selected"}
          </p>
        </motion.div>

        {/* Timer Circle with Dynamic Shadows */}
        <div className="relative">
          <motion.div
            className="w-80 h-80 rounded-full border-4 border-neutral-700/40 flex items-center justify-center relative overflow-hidden"
            animate={{
              boxShadow: [
                `0 0 40px ${getShadowColor()}40, 0 0 80px ${getShadowColor()}20, 0 0 120px ${getShadowColor()}10`,
                `0 0 60px ${getShadowColor()}60, 0 0 100px ${getShadowColor()}30, 0 0 140px ${getShadowColor()}15`,
                `0 0 40px ${getShadowColor()}40, 0 0 80px ${getShadowColor()}20, 0 0 120px ${getShadowColor()}10`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: isRunning ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="150"
                fill="none"
                stroke={getSessionColor()}
                strokeWidth="4"
                strokeDasharray={`${(progress / 100) * 942} 942`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: `drop-shadow(0 0 8px ${getSessionColor()}) drop-shadow(0 0 16px ${getSessionColor()}40)`,
                }}
              />
            </svg>

            {/* Time Display */}
            <motion.div
              className="text-center z-10"
              animate={{
                scale: isRunning ? [1, 1.02, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isRunning ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              }}
            >
              <div className="text-6xl font-mono font-bold text-white mb-2">{formatTime(timeLeft)}</div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider">
                {isRunning ? "In Progress" : "Paused"}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Controls with Dynamic Shadows */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isRunning
                ? `0 0 20px ${getShadowColor()}60, 0 0 40px ${getShadowColor()}30`
                : `0 0 20px #FF000060, 0 0 40px #FF000030`,
            }}
            className="rounded-full"
          >
            <Button
              onClick={handleStartPause}
              size="lg"
              className={cn(
                "w-16 h-16 rounded-full bg-white/5 border border-neutral-700/40 hover:bg-white/10 transition-all duration-300",
                isRunning && "ring-2 ring-opacity-50",
              )}
              style={{
                ringColor: getShadowColor(),
              }}
            >
              <AnimatePresence mode="wait">
                {isRunning ? (
                  <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Pause className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Play className="w-6 h-6 text-white ml-1" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
            }}
            className="rounded-full"
          >
            <Button
              onClick={handleReset}
              size="lg"
              variant="ghost"
              className="w-16 h-16 rounded-full bg-white/5 border border-neutral-700/40 hover:bg-white/10 transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5 text-neutral-400" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
            }}
            className="rounded-full"
          >
            <Button
              size="lg"
              variant="ghost"
              className="w-16 h-16 rounded-full bg-white/5 border border-neutral-700/40 hover:bg-white/10 transition-all duration-300"
            >
              <Settings className="w-5 h-5 text-neutral-400" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Card>
  )
}
