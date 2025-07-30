import { create } from "zustand"
import { persist } from "zustand/middleware"

interface DayStats {
  date: string
  sessions: number
  focusTime: number // in minutes
  tasksCompleted: number
  breaks: number
}

interface StatsState {
  dailyStats: DayStats[]
  todayStats: DayStats
  weeklyData: DayStats[]

  // Actions
  recordSession: (duration: number, type: "work" | "break") => void
  recordTaskCompletion: () => void
  getTodayStats: () => DayStats
  getWeeklyData: () => DayStats[]
}

const getTodayString = () => new Date().toISOString().split("T")[0]

const getEmptyDayStats = (date: string): DayStats => ({
  date,
  sessions: 0,
  focusTime: 0,
  tasksCompleted: 0,
  breaks: 0,
})

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      dailyStats: [],
      todayStats: getEmptyDayStats(getTodayString()),
      weeklyData: [],

      recordSession: (duration, type) => {
        const today = getTodayString()
        const { dailyStats } = get()

        const existingDayIndex = dailyStats.findIndex((day) => day.date === today)

        if (existingDayIndex >= 0) {
          const updatedStats = [...dailyStats]
          if (type === "work") {
            updatedStats[existingDayIndex].sessions += 1
            updatedStats[existingDayIndex].focusTime += duration
          } else {
            updatedStats[existingDayIndex].breaks += 1
          }

          set({
            dailyStats: updatedStats,
            todayStats: updatedStats[existingDayIndex],
          })
        } else {
          const newDayStats = getEmptyDayStats(today)
          if (type === "work") {
            newDayStats.sessions = 1
            newDayStats.focusTime = duration
          } else {
            newDayStats.breaks = 1
          }

          set({
            dailyStats: [...dailyStats, newDayStats],
            todayStats: newDayStats,
          })
        }

        // Update weekly data
        get().getWeeklyData()
      },

      recordTaskCompletion: () => {
        const today = getTodayString()
        const { dailyStats } = get()

        const existingDayIndex = dailyStats.findIndex((day) => day.date === today)

        if (existingDayIndex >= 0) {
          const updatedStats = [...dailyStats]
          updatedStats[existingDayIndex].tasksCompleted += 1

          set({
            dailyStats: updatedStats,
            todayStats: updatedStats[existingDayIndex],
          })
        } else {
          const newDayStats = getEmptyDayStats(today)
          newDayStats.tasksCompleted = 1

          set({
            dailyStats: [...dailyStats, newDayStats],
            todayStats: newDayStats,
          })
        }
      },

      getTodayStats: () => {
        const today = getTodayString()
        const { dailyStats } = get()
        return dailyStats.find((day) => day.date === today) || getEmptyDayStats(today)
      },

      getWeeklyData: () => {
        const { dailyStats } = get()
        const weeklyData: DayStats[] = []

        // Get last 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date()
          date.setDate(date.getDate() - i)
          const dateString = date.toISOString().split("T")[0]

          const dayStats = dailyStats.find((day) => day.date === dateString) || getEmptyDayStats(dateString)
          weeklyData.push(dayStats)
        }

        set({ weeklyData })
        return weeklyData
      },
    }),
    {
      name: "stats-store",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.todayStats = state.getTodayStats()
          state.weeklyData = state.getWeeklyData()
          // Add streak calculation
          state.todayStats.streak = Math.min(state.dailyStats.length, 7)
        }
      },
    },
  ),
)
