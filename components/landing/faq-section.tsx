"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is the Pomodoro Technique?",
      answer:
        "The Pomodoro Technique is a time management method that breaks work into 25-minute focused intervals, followed by short breaks. It helps improve focus and prevents burnout.",
    },
    {
      question: "How does the AI insights feature work?",
      answer:
        "Our AI analyzes your work patterns, identifies your most productive hours, suggests optimal break times, and provides personalized recommendations to improve your focus.",
    },
    {
      question: "Can I customize the timer intervals?",
      answer:
        "Yes! While the default is 25-minute work sessions with 5-minute breaks, you can customize both work and break durations to fit your workflow.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade encryption and never share your personal data. Your productivity insights remain private and secure.",
    },
    {
      question: "Do you offer team features?",
      answer:
        "Team features are coming soon! You'll be able to collaborate on projects, share achievements, and track team productivity metrics.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-xl text-neutral-400">Everything you need to know about PomoFocus</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            <button
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-lg font-semibold text-white">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#00FFFF] transition-transform ${openIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6">
                <p className="text-neutral-300">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQSection


