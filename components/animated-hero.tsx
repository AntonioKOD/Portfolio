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
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-primary/20 to-secondary/20 animate-pulse-light" />
              <div className="absolute inset-4 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center overflow-hidden">
                <div className="w-full h-full relative">
                  {/* Business-friendly visualization */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* Website/App representation */}
                    <motion.div
                      className="relative w-64 h-48 bg-white/10 rounded-lg border border-white/20 overflow-hidden mb-4"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      {/* Header bar */}
                      <div className="h-6 w-full bg-primary/30 flex items-center px-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-red-400"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                      </div>

                      {/* Content representation */}
                      <div className="p-3 flex flex-col space-y-2">
                        <div className="h-4 w-3/4 bg-white/20 rounded"></div>
                        <div className="h-4 w-1/2 bg-white/20 rounded"></div>
                        <div className="flex space-x-2 mt-2">
                          <div className="h-8 w-16 bg-primary/40 rounded"></div>
                          <div className="h-8 w-16 bg-accent/40 rounded"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="h-12 bg-white/20 rounded"></div>
                          <div className="h-12 bg-white/20 rounded"></div>
                          <div className="h-12 bg-white/20 rounded"></div>
                          <div className="h-12 bg-white/20 rounded"></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Connecting elements */}
                    <motion.div
                      className="flex items-center justify-center space-x-8 mt-2"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <motion.div
                        className="flex flex-col items-center"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <path d="M20.4 14.5 16 10 4 20"></path>
                          </svg>
                        </div>
                        <span className="text-xs mt-1 text-white/80">Design</span>
                      </motion.div>

                      <motion.div
                        className="flex flex-col items-center"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path>
                            <polygon points="10 15 15 12 10 9"></polygon>
                          </svg>
                        </div>
                        <span className="text-xs mt-1 text-white/80">Develop</span>
                      </motion.div>

                      <motion.div
                        className="flex flex-col items-center"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-rose-dark/30 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M12 2v4"></path>
                            <path d="M12 18v4"></path>
                            <path d="m4.93 4.93 2.83 2.83"></path>
                            <path d="m16.24 16.24 2.83 2.83"></path>
                            <path d="M2 12h4"></path>
                            <path d="M18 12h4"></path>
                            <path d="m4.93 19.07 2.83-2.83"></path>
                            <path d="m16.24 7.76 2.83-2.83"></path>
                          </svg>
                        </div>
                        <span className="text-xs mt-1 text-white/80">Launch</span>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="mt-4 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <span className="text-lg font-medium text-white">Your Vision, Expertly Delivered</span>
                    </motion.div>
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

