"use client"

import React from "react"

export function StatsSection() {
  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "2M+", label: "Pomodoros Completed" },
    { number: "98%", label: "User Satisfaction" },
    { number: "45%", label: "Productivity Increase" },
  ]

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] bg-clip-text text-transparent mb-2">
              {stat.number}
            </div>
            <div className="text-neutral-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsSection


