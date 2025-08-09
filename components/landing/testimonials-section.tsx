"use client"

import React from "react"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Developer",
      avatar: "SC",
      text: "PomoFocus transformed my coding sessions. I'm 40% more productive and less burned out.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Designer",
      avatar: "MJ",
      text: "The AI insights helped me identify my peak focus hours. Game-changer for creative work!",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Student",
      avatar: "ER",
      text: "Finally, a productivity app that actually works. My study sessions are so much more effective.",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
        <p className="text-xl text-neutral-400">Join thousands of satisfied productivity enthusiasts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(127,90,240,0.2)]"
          >
            <div className="flex items-center mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-neutral-300 mb-6 italic">"{testimonial.text}"</p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00FFFF] to-[#7F5AF0] rounded-full flex items-center justify-center text-black font-semibold mr-3">
                {testimonial.avatar}
              </div>
              <div>
                <div className="text-white font-semibold">{testimonial.name}</div>
                <div className="text-neutral-400 text-sm">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection


