"use client"

import { Navigation } from "@/components/navigation"
import { TimerSettings } from "@/components/timer-settings"
import { NotificationSettings } from "@/components/notification-settings"
import { AISettings } from "@/components/ai-settings"
import { AccountSettings } from "@/components/account-settings"
import { motion } from "framer-motion"

export default function Settings() {
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
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Settings</h1>
            <p className="text-neutral-400 text-lg">Customize your productivity experience</p>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TimerSettings />
            <NotificationSettings />
            <AISettings />
            <AccountSettings />
          </div>
        </motion.div>
      </main>
    </div>
  )
}
