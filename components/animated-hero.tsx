"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AnimatedHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden py-20 md:py-28 animated-bg text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-3/4 left-1/2 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay animate-float"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-2 backdrop-blur-sm"
            >
              Web Development & Technical Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
            >
              Building the <span className="text-accent">Digital Backbone</span> for Your Business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            >
              Expert web development services specializing in modern, responsive websites and applications that drive
              results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col gap-2 min-[400px]:flex-row pt-4"
            >
              <Link href="/contact">
                <Button size="lg" className="gradient-button font-medium">
                  Get Started <ArrowRight className="ml-2 h-4 w-4 animate-bounce-light" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 font-medium"
                >
                  View My Work
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-primary/20 to-secondary/20 animate-pulse-light" />
              <div className="absolute inset-4 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center overflow-hidden">
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-accent/20 animate-spin-slow" />
                    <div
                      className="absolute w-48 h-48 rounded-full border-2 border-dashed border-white/20 animate-spin-slow"
                      style={{ animationDirection: "reverse" }}
                    />
                    <div className="absolute w-64 h-64 rounded-full border border-white/10 animate-pulse-light" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <code className="text-lg font-mono text-white">&lt;codeWithToni /&gt;</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

