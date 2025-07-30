"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ArrowRight, ArrowLeft, Play, Target, BarChart3, Settings } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { createClient } from "@/lib/supabase-client"

interface TutorialStep {
  id: string
  title: string
  description: string
  target: string
  icon: React.ReactNode
  position: "top" | "bottom" | "left" | "right"
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "Welcome to PomoFocus! 🎉",
    description: "Let's take a quick tour to get you started with your productivity journey.",
    target: "body",
    icon: <Play className="w-5 h-5" />,
    position: "bottom",
  },
  {
    id: "timer",
    title: "Focus Timer",
    description:
      "This is your main focus timer. Click play to start a 25-minute focus session with dynamic colored shadows!",
    target: "[data-tour='timer']",
    icon: <Play className="w-5 h-5" />,
    position: "bottom",
  },
  {
    id: "tasks",
    title: "Task Management",
    description: "Add and manage your tasks here. You can view them in Kanban, List, or Eisenhower Matrix format.",
    target: "[data-tour='tasks']",
    icon: <Target className="w-5 h-5" />,
    position: "left",
  },
  {
    id: "analytics",
    title: "Analytics & Insights",
    description: "Track your productivity patterns and get AI-powered insights to improve your focus.",
    target: "[data-tour='analytics']",
    icon: <BarChart3 className="w-5 h-5" />,
    position: "bottom",
  },
  {
    id: "settings",
    title: "Customize Your Experience",
    description: "Adjust timer settings, notifications, AI providers, and more in the settings page.",
    target: "[data-tour='settings']",
    icon: <Settings className="w-5 h-5" />,
    position: "bottom",
  },
]

export function OnboardingTour() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    checkShouldShowTutorial()
  }, [user])

  const checkShouldShowTutorial = async () => {
    if (!user) {
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.from("users").select("settings").eq("id", user.id).single()

      if (error) {
        console.error("Error fetching user settings:", error)
        setIsLoading(false)
        return
      }

      const showTutorial = data?.settings?.showTutorial ?? true
      setIsVisible(showTutorial)
    } catch (error) {
      console.error("Error checking tutorial status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsVisible(false)

    if (user) {
      try {
        await supabase
          .from("users")
          .update({
            settings: {
              showTutorial: false,
            },
          })
          .eq("id", user.id)
      } catch (error) {
        console.error("Error updating tutorial status:", error)
      }
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  if (isLoading || !isVisible) {
    return null
  }

  const currentStepData = tutorialSteps[currentStep]

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
          />

          {/* Tutorial Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000]"
          >
            <Card className="w-96 p-6 bg-black/90 backdrop-blur-sm border-neutral-700/40 rounded-2xl">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-[#00FFFF]/10 text-[#00FFFF]">{currentStepData.icon}</div>
                    <Badge className="bg-[#7F5AF0]/20 text-[#7F5AF0] border-[#7F5AF0]/30">
                      {currentStep + 1} of {tutorialSteps.length}
                    </Badge>
                  </div>
                  <Button onClick={handleSkip} size="sm" variant="ghost" className="text-neutral-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">{currentStepData.title}</h3>
                  <p className="text-neutral-300 leading-relaxed">{currentStepData.description}</p>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>Progress</span>
                    <span>{Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    variant="ghost"
                    className="text-neutral-400 hover:text-white disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center space-x-2">
                    <Button onClick={handleSkip} variant="ghost" className="text-neutral-400 hover:text-white">
                      Skip Tour
                    </Button>
                    <Button onClick={handleNext} className="bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-black">
                      {currentStep === tutorialSteps.length - 1 ? "Get Started" : "Next"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
