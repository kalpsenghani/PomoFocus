"use client"

import React from "react"
import { ArrowRight, Target, Clock, Heart, TrendingUp } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Set Your Goal",
      description: "Create a task and estimate how many pomodoros it will take to complete.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Focus Time",
      description: "Work for 25 minutes with complete focus. No distractions, just pure productivity.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Take a Break",
      description: "Enjoy a 5-minute break to recharge. After 4 pomodoros, take a longer 15-30 minute break.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Progress",
      description: "Review your productivity insights and continuously improve your focus habits.",
    },
  ]

  return (
    <section id="how-it-works" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">How PomoFocus Works</h2>
        <p className="text-xl text-neutral-400">Master the art of focused work in 4 simple steps</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center transition-transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
              <div className="w-16 h-16 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                {step.icon}
              </div>
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-full flex items-center justify-center text-black font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-neutral-400">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-6 h-6 text-[#00FFFF]/50" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorksSection


