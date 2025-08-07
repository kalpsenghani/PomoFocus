"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BackgroundAnimation } from "@/components/background-animation"
import { Navigation } from "@/components/navigation"
import { Check, Star, Zap, Target, BarChart3, Clock } from "lucide-react"
import { AnimatedTimerRing } from "@/components/animated-timer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] relative overflow-hidden">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-bold text-white mb-6">
                Focus Better,{" "}
                <span className="bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] bg-clip-text text-transparent">
                  Achieve More
                </span>
              </h1>
              <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto lg:mx-0">
                The AI-powered productivity platform that helps you stay focused, track progress, 
                and achieve your goals with intelligent insights and seamless workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black hover:opacity-90">
                    <Zap className="w-5 h-5 mr-2" />
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF]/10">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <AnimatedTimerRing />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose PomoFocus?</h2>
            <p className="text-xl text-neutral-400">Everything you need to boost your productivity</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Pomodoro Timer</h3>
              <p className="text-neutral-400">Intelligent time management with customizable work and break intervals.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(127,90,240,0.2)]">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Task Management</h3>
              <p className="text-neutral-400">Organize tasks with priority levels and track completion progress.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Insights</h3>
              <p className="text-neutral-400">Get personalized productivity insights and recommendations.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(127,90,240,0.2)]">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Achievement System</h3>
              <p className="text-neutral-400">Earn badges and track your productivity milestones.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quick Actions</h3>
              <p className="text-neutral-400">Streamlined workflow with one-click task creation and timer start.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(127,90,240,0.2)]">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Analytics Dashboard</h3>
              <p className="text-neutral-400">Comprehensive productivity analytics and progress tracking.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-xl text-neutral-400">Choose the plan that fits your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
              <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $0<span className="text-lg text-neutral-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Basic Pomodoro Timer
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Up to 10 tasks
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Basic analytics
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Achievement badges
                </li>
              </ul>
              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black">
                  Get Started Free
                </Button>
              </Link>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-[#00FFFF]/20 to-[#7F5AF0]/20 backdrop-blur-sm rounded-xl p-8 border border-[#00FFFF]/30 relative transition-transform hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(0,255,255,0.25)]">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $9<span className="text-lg text-neutral-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Everything in Free
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Unlimited tasks
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Advanced AI insights
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Detailed analytics
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Priority support
                </li>
              </ul>
              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black">
                  Start Pro Trial
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Boost Your Productivity?</h2>
            <p className="text-xl text-neutral-400 mb-8">
              Join thousands of users who have transformed their workflow with PomoFocus.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black hover:opacity-90">
                <Zap className="w-5 h-5 mr-2" />
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10">
          <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between text-neutral-400">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-md" />
              <span>PomoFocus</span>
            </div>
            <div className="space-x-6">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">Twitter</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
              <a href="mailto:hello@pomofocus.app" className="hover:text-white">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
