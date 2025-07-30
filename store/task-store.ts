import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Task {
  id: string
  title: string
  description?: string
  estimatedPomodoros: number
  actualPomodoros: number
  status: "todo" | "in_progress" | "done"
  priority: "low" | "medium" | "high" | "urgent"
  tags?: string[]
  createdAt: Date
  completedAt?: Date
  updatedAt: Date
}

interface TaskState {
  tasks: Task[]
  currentTask: Task | null

  // Actions
  addTask: (task: Omit<Task, "id" | "actualPomodoros" | "status" | "createdAt" | "updatedAt">) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
  setCurrentTask: (task: Task | null) => void
  incrementPomodoro: (id: string) => void
  getTasks: () => Task[]
  getTasksByStatus: (status: Task["status"]) => Task[]
  getTasksByPriority: (priority: Task["priority"]) => Task[]
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      currentTask: null,

      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: crypto.randomUUID(),
          actualPomodoros: 0,
          status: "todo",
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set((state) => ({
          tasks: [newTask, ...state.tasks], // Add to beginning for recent first
        }))
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task)),
          currentTask:
            state.currentTask?.id === id
              ? { ...state.currentTask, ...updates, updatedAt: new Date() }
              : state.currentTask,
        }))
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          currentTask: state.currentTask?.id === id ? null : state.currentTask,
        }))
      },

      toggleTask: (id) => {
        const { tasks, updateTask } = get()
        const task = tasks.find((t) => t.id === id)
        if (task) {
          const newStatus = task.status === "done" ? "todo" : "done"
          updateTask(id, {
            status: newStatus,
            completedAt: newStatus === "done" ? new Date() : undefined,
          })
        }
      },

      setCurrentTask: (task) => {
        set({ currentTask: task })
        if (task && task.status !== "in_progress") {
          get().updateTask(task.id, { status: "in_progress" })
        }
      },

      incrementPomodoro: (id) => {
        const { tasks, updateTask } = get()
        const task = tasks.find((t) => t.id === id)
        if (task) {
          updateTask(id, { actualPomodoros: task.actualPomodoros + 1 })
        }
      },

      getTasks: () => get().tasks,

      getTasksByStatus: (status) => get().tasks.filter((task) => task.status === status),

      getTasksByPriority: (priority) => get().tasks.filter((task) => task.priority === priority),
    }),
    {
      name: "task-store",
      version: 1,
    },
  ),
)
