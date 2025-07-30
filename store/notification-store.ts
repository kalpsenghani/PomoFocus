import { create } from "zustand"
import { persist } from "zustand/middleware"

interface NotificationSettings {
  sounds: boolean
  notifications: boolean
  vibrations: boolean
  volume: number
}

interface NotificationState {
  settings: NotificationSettings

  // Actions
  updateSettings: (settings: Partial<NotificationSettings>) => void
  playSound: (type: "start" | "pause" | "complete" | "break" | "reset") => void
  showNotification: (title: string, body: string, icon?: string) => void
  vibrate: (pattern: number[]) => void
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      settings: {
        sounds: true,
        notifications: true,
        vibrations: true,
        volume: 0.7,
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }))
      },

      playSound: (type) => {
        const { settings } = get()
        if (!settings.sounds) return

        // Create audio context for better sound control
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

        const playTone = (frequency: number, duration: number, volume: number = settings.volume) => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = frequency
          oscillator.type = "sine"

          gainNode.gain.setValueAtTime(0, audioContext.currentTime)
          gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + duration)
        }

        switch (type) {
          case "start":
            playTone(800, 0.2)
            setTimeout(() => playTone(1000, 0.2), 200)
            break
          case "pause":
            playTone(600, 0.3)
            break
          case "complete":
            playTone(800, 0.2)
            setTimeout(() => playTone(1000, 0.2), 200)
            setTimeout(() => playTone(1200, 0.3), 400)
            break
          case "break":
            playTone(400, 0.5)
            break
          case "reset":
            playTone(300, 0.2)
            break
        }
      },

      showNotification: (title, body, icon = "/icon-192x192.png") => {
        const { settings } = get()
        if (!settings.notifications) return

        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(title, {
            body,
            icon,
            badge: icon,
            tag: "pomofocus",
            requireInteraction: false,
            silent: false,
          })
        }
      },

      vibrate: (pattern) => {
        const { settings } = get()
        if (!settings.vibrations) return

        if ("vibrate" in navigator) {
          navigator.vibrate(pattern)
        }
      },
    }),
    {
      name: "notification-store",
    },
  ),
)
