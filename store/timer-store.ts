import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SessionType = "work" | "shortBreak" | "longBreak"

interface TimerSettings {
  workDuration: number // in minutes
  shortBreakDuration: number
  longBreakDuration: number
  longBreakInterval: number // after how many work sessions
  autoStartBreaks: boolean
  autoStartWork: boolean
}

interface TimerState {
  timeLeft: number // in seconds
  isRunning: boolean
  currentSession: SessionType
  sessionCount: number
  settings: TimerSettings

  // Actions
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  tick: () => void
  switchSession: () => void
  updateSettings: (settings: Partial<TimerSettings>) => void
}

const defaultSettings: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartWork: false,
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      timeLeft: defaultSettings.workDuration * 60,
      isRunning: false,
      currentSession: "work",
      sessionCount: 0,
      settings: defaultSettings,

      startTimer: () => {
        set({ isRunning: true })
      },

      pauseTimer: () => {
        set({ isRunning: false })
      },

      resetTimer: () => {
        const { settings, currentSession } = get()
        const duration =
          currentSession === "work"
            ? settings.workDuration
            : currentSession === "shortBreak"
              ? settings.shortBreakDuration
              : settings.longBreakDuration

        set({
          timeLeft: duration * 60,
          isRunning: false,
        })
      },

      tick: () => {
        const { timeLeft, switchSession } = get()
        if (timeLeft > 0) {
          set({ timeLeft: timeLeft - 1 })
        } else {
          switchSession()
        }
      },

      switchSession: () => {
        const { currentSession, sessionCount, settings } = get()
        let newSession: SessionType
        let newSessionCount = sessionCount

        if (currentSession === "work") {
          newSessionCount += 1
          if (newSessionCount % settings.longBreakInterval === 0) {
            newSession = "longBreak"
          } else {
            newSession = "shortBreak"
          }
        } else {
          newSession = "work"
        }

        const duration =
          newSession === "work"
            ? settings.workDuration
            : newSession === "shortBreak"
              ? settings.shortBreakDuration
              : settings.longBreakDuration

        set({
          currentSession: newSession,
          sessionCount: newSessionCount,
          timeLeft: duration * 60,
          isRunning: false,
        })

        // Show notification
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(`${newSession === "work" ? "Work" : "Break"} time!`, {
            body: `Time for a ${newSession === "work" ? "focus session" : "break"}`,
            icon: "/icon-192x192.png",
          })
        }
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }))
      },
    }),
    {
      name: "timer-store",
    },
  ),
)
