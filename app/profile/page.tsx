"use client"

import { Navigation } from "@/components/navigation"
import { ProfileHeader } from "@/components/profile-header"
import { AchievementsBadges } from "@/components/achievements-badges"
import { ProductivityGoals } from "@/components/productivity-goals"
import { ActivityFeed } from "@/components/activity-feed"
import { motion } from "framer-motion"

export default function Profile() {
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
          <ProfileHeader />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <AchievementsBadges />
              <ActivityFeed />
            </div>
            <div>
              <ProductivityGoals />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
