"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { BackgroundAnimation } from "@/components/background-animation"
import { Navigation } from "@/components/navigation"
import { Check, Star, Zap, Target, BarChart3, Clock, Shield, Users, MessageCircle } from "lucide-react"
import { AnimatedTimerRing } from "@/components/animated-timer"
import { StatsSection } from "@/components/landing/stats-section"
import { HowItWorksSection } from "@/components/landing/how-it-works"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PlatformSection } from "@/components/landing/platform-section"
import { FAQSection } from "@/components/landing/faq-section"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#111827] to-[#1E1E1E] relative overflow-hidden">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00FFFF]/20 to-[#7F5AF0]/20 rounded-full mb-6 backdrop-blur-sm border border-[#00FFFF]/30">
                <Zap className="w-4 h-4 text-[#00FFFF] mr-2" />
                <span className="text-sm text-[#00FFFF] font-semibold">AI-Powered Productivity</span>
              </div>
              <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                Focus Better,{" "}
                <span className="bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] bg-clip-text text-transparent">
                  Achieve More
                </span>
              </h1>
              <p className="text-xl text-neutral-400 mb-8 max-w-2xl">
                The AI-powered productivity platform that helps you stay focused, track progress, 
                and achieve your goals with intelligent insights and seamless workflow management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Free Trial
                </button>
                <button className="border border-[#00FFFF] text-[#00FFFF] px-8 py-4 rounded-lg font-semibold hover:bg-[#00FFFF]/10 transition-colors">
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center mt-6 text-sm text-neutral-400">
                <Check className="w-4 h-4 text-[#00FFFF] mr-2" />
                No credit card required
                <Check className="w-4 h-4 text-[#00FFFF] mr-2 ml-6" />
                14-day free trial
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                <AnimatedTimerRing />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features for Maximum Productivity</h2>
            <p className="text-xl text-neutral-400">Everything you need to master focus and achieve your goals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,255,255,0.3)] group">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Pomodoro Timer</h3>
              <p className="text-neutral-400 mb-4">Intelligent time management with customizable work and break intervals that adapt to your productivity patterns.</p>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li className="flex items-center"><Check className="w-4 h-4 text-[#00FFFF] mr-2" />Google Calendar sync</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-[#00FFFF] mr-2" />Outlook integration</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-[#00FFFF] mr-2" />Time blocking</li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(127,90,240,0.3)] group">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Privacy & Security</h3>
              <p className="text-neutral-400 mb-4">Your data is protected with enterprise-grade security and complete privacy controls.</p>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li className="flex items-center"><Check className="w-4 h-4 text-[#00FFFF] mr-2" />End-to-end encryption</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-[#00FFFF] mr-2" />GDPR compliant</li>
                <li className="flex items-center"><Check className="w-4 h-4 text-[#00FFFF] mr-2" />No data selling</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Platform Section */}
        <PlatformSection />

        {/* Pricing Section */}
        <section id="pricing" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-neutral-400">Choose the plan that fits your productivity needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 transition-transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
              <h3 className="text-2xl font-bold text-white mb-4">Starter</h3>
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
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Web access
                </li>
              </ul>
              <button className="w-full bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                Get Started Free
              </button>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-[#00FFFF]/20 to-[#7F5AF0]/20 backdrop-blur-sm rounded-xl p-8 border border-[#00FFFF]/30 relative transition-transform hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(0,255,255,0.4)] scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black px-6 py-2 rounded-full text-sm font-bold">
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
                  Everything in Starter
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
                  Calendar integration
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Priority support
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Start Pro Trial
              </button>
            </div>

            {/* Team Plan */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 transition-transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(127,90,240,0.2)]">
              <h3 className="text-2xl font-bold text-white mb-4">Team</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $29<span className="text-lg text-neutral-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Everything in Pro
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Up to 10 team members
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Team analytics
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Shared workspaces
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  Admin controls
                </li>
                <li className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-[#00FFFF] mr-3" />
                  24/7 support
                </li>
              </ul>
              <button className="w-full bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-neutral-400 mb-4">All plans include a 14-day free trial • No credit card required</p>
            <div className="flex items-center justify-center space-x-6 text-sm text-neutral-500">
              <span className="flex items-center"><Shield className="w-4 h-4 mr-1" />Secure & Private</span>
              <span className="flex items-center"><Users className="w-4 h-4 mr-1" />24/7 Support</span>
              <span className="flex items-center"><Zap className="w-4 h-4 mr-1" />Cancel Anytime</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Final CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-[#00FFFF]/10 to-[#7F5AF0]/10 backdrop-blur-sm rounded-2xl p-12 border border-[#00FFFF]/20 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Productivity?</h2>
            <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
              Join over 50,000 users who have revolutionized their workflow with PomoFocus. 
              Start your free trial today and experience the power of AI-driven productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] text-black px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Start Your Free Trial
              </button>
              <button className="border border-[#00FFFF] text-[#00FFFF] px-8 py-4 rounded-lg font-semibold hover:bg-[#00FFFF]/10 transition-colors flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Book a Demo
              </button>
            </div>
            <div className="flex items-center justify-center mt-6 text-sm text-neutral-400">
              <Check className="w-4 h-4 text-[#00FFFF] mr-2" />
              14-day free trial
              <Check className="w-4 h-4 text-[#00FFFF] mr-2 ml-6" />
              No setup fees
              <Check className="w-4 h-4 text-[#00FFFF] mr-2 ml-6" />
              Cancel anytime
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-xl font-bold text-white">PomoFocus</span>
                </div>
                <p className="text-neutral-400 mb-4">The ultimate AI-powered productivity platform for focused work and better results.</p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-neutral-400 hover:text-[#00FFFF] hover:bg-white/20 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-neutral-400 hover:text-[#00FFFF] hover:bg-white/20 transition-colors">
                    <Star className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-neutral-400 hover:text-[#00FFFF] hover:bg-white/20 transition-colors">
                    <Users className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-neutral-400">
                  <li><a href="#features" className="hover:text-[#00FFFF] transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-[#00FFFF] transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Roadmap</a></li>
                  <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Integrations</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-neutral-400">
                  <li><a href="#" className="hover:text-[#00FFFF] transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Press</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-neutral-400">
                  <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-[#00FFFF] transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-neutral-400">
              <div className="mb-4 sm:mb-0">
                © 2025 PomoFocus. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}