"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface CustomWebsiteBenefitsProps {
  className?: string
  width?: number
  height?: number
}

export function CustomWebsiteBenefits({ className = "", width = 600, height = 500 }: CustomWebsiteBenefitsProps) {
  const [isClient, setIsClient] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Prevent hydration mismatch with animations
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Start animations when component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  if (!isClient) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-primary/10 to-background rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="animate-pulse text-primary/50">Loading illustration...</div>
      </div>
    )
  }

  // Define the website benefits with clear, concise descriptions
  const benefits = [
    {
      id: "brand",
      title: "Unique Brand Identity",
      description: "Stand out with design that perfectly reflects your brand",
      icon: "🎨",
      color: "#5eead4",
    },
    {
      id: "responsive",
      title: "Responsive Design",
      description: "Perfect experience on all devices - mobile to desktop",
      icon: "📱",
      color: "#a855f7",
    },
    {
      id: "seo",
      title: "SEO Optimization",
      description: "Built to rank higher in search engine results",
      icon: "🔍",
      color: "#f59e0b",
    },
    {
      id: "performance",
      title: "Fast Performance",
      description: "Optimized code for lightning-fast loading times",
      icon: "⚡",
      color: "#3b82f6",
    },
    {
      id: "custom",
      title: "Custom Features",
      description: "Functionality tailored to your specific business needs",
      icon: "🛠️",
      color: "#f43f5e",
    },
    {
      id: "scalable",
      title: "Scalable Solution",
      description: "Grows with your business and adapts to changing needs",
      icon: "📈",
      color: "#10b981",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const websiteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8,
      },
    },
  }

  const benefitVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <div ref={ref} className={`relative ${className}`} style={{ width, height }}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background/50 rounded-lg"></div>

      {/* Main container */}
      <motion.div className="relative w-full h-full" variants={containerVariants} initial="hidden" animate={controls}>
        {/* Central Website Showcase */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-3/5"
          variants={websiteVariants}
        >
          {/* Main Website Frame */}
          <div className="relative w-full h-full bg-slate-800 rounded-lg border-2 border-primary shadow-lg overflow-hidden">
            {/* Browser Bar */}
            <div className="h-[8%] w-full bg-slate-900 flex items-center px-2">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              </div>
              <div className="mx-auto w-2/3 h-[60%] bg-slate-700 rounded-md"></div>
            </div>

            {/* Website Content */}
            <div className="p-2 h-[92%]">
              {/* Header */}
              <div className="h-[15%] w-full bg-slate-700 rounded-md mb-2 flex">
                <div className="w-1/4 h-full bg-primary/70 rounded-md mr-2"></div>
                <div className="w-3/4 h-full flex items-center justify-end">
                  <div className="w-2/3 h-1/3 bg-white/20 rounded-md"></div>
                </div>
              </div>

              {/* Hero */}
              <div className="h-[30%] w-full bg-purple-500/20 rounded-md mb-2 p-2">
                <div className="w-1/2 h-1/4 bg-white/30 rounded-sm mb-1"></div>
                <div className="w-3/4 h-1/4 bg-white/20 rounded-sm mb-1"></div>
                <div className="w-1/3 h-1/3 bg-primary rounded-md"></div>
              </div>

              {/* Content Sections */}
              <div className="h-[30%] w-full flex space-x-2 mb-2">
                <div className="flex-1 bg-slate-700 rounded-md"></div>
                <div className="flex-1 bg-slate-700 rounded-md"></div>
                <div className="flex-1 bg-slate-700 rounded-md"></div>
              </div>

              {/* Footer */}
              <div className="h-[15%] w-full bg-slate-900 rounded-md"></div>
            </div>
          </div>

          {/* Mobile Device */}
          <motion.div
            className="absolute -right-[15%] top-1/4 w-[20%] h-[40%] bg-slate-800 rounded-xl border-2 border-purple-500 shadow-lg overflow-hidden"
            animate={{
              y: [0, -5, 0],
              x: [0, 2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="h-[8%] w-full bg-slate-900"></div>
            <div className="p-1 h-[92%]">
              <div className="h-[15%] w-full bg-purple-500/20 rounded-sm mb-1"></div>
              <div className="h-[50%] w-full bg-slate-700 rounded-sm mb-1"></div>
              <div className="h-[15%] w-full bg-slate-700 rounded-sm"></div>
            </div>
          </motion.div>

          {/* Tablet Device */}
          <motion.div
            className="absolute -left-[25%] top-1/4 w-[30%] h-[45%] bg-slate-800 rounded-lg border-2 border-amber-500 shadow-lg overflow-hidden"
            animate={{
              y: [0, -8, 0],
              x: [0, -3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <div className="h-[5%] w-full bg-slate-900"></div>
            <div className="p-1.5 h-[95%]">
              <div className="h-[15%] w-full bg-amber-500/20 rounded-sm mb-1.5"></div>
              <div className="h-[60%] w-full bg-slate-700 rounded-sm mb-1.5"></div>
              <div className="h-[15%] w-full bg-slate-700 rounded-sm"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Benefit Nodes */}
        {benefits.map((benefit, index) => {
          // Calculate positions around the website mockup
          const angle = (index * Math.PI * 2) / benefits.length
          const radius = Math.min(width, height) * 0.35
          const x = width / 2 + radius * Math.cos(angle)
          const y = height / 2 + radius * Math.sin(angle)

          const isActive = activeSection === benefit.id

          return (
            <motion.div
              key={benefit.id}
              className="absolute"
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
              }}
              variants={benefitVariants}
              onHoverStart={() => setActiveSection(benefit.id)}
              onHoverEnd={() => setActiveSection(null)}
            >
              {/* Connection line to website */}
              <motion.div
                className="absolute left-1/2 top-1/2 -z-10"
                style={{
                  width: "1px",
                  height: radius,
                  backgroundColor: benefit.color,
                  opacity: isActive ? 0.9 : 0.6,
                  transformOrigin: "bottom center",
                  transform: `rotate(${angle + Math.PI}rad) translateY(${radius / 2}px)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isActive ? 0.9 : 0.6,
                  scale: 1,
                }}
                transition={{ duration: 1 }}
              />

              {/* Benefit Node */}
              <motion.div
                className="relative cursor-pointer"
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex items-center justify-center rounded-full shadow-lg"
                  style={{
                    width: isActive ? 70 : 60,
                    height: isActive ? 70 : 60,
                    backgroundColor: "#1e293b",
                    border: `${isActive ? 4 : 2}px solid ${benefit.color}`,
                  }}
                >
                  <span className="text-2xl">{benefit.icon}</span>
                </motion.div>

                {/* Benefit Title */}
                <motion.div
                  className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap"
                  animate={{
                    y: isActive ? -5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="px-3 py-1.5 rounded-md text-white text-xs font-semibold"
                    style={{
                      backgroundColor: isActive ? benefit.color : "#1e293b",
                      opacity: isActive ? 0.9 : 0.7,
                    }}
                  >
                    {benefit.title}
                  </motion.div>
                </motion.div>

                {/* Tooltip on hover */}
                {isActive && (
                  <motion.div
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="px-4 py-2 rounded-lg text-white text-xs text-center max-w-[200px]"
                      style={{ backgroundColor: benefit.color }}
                    >
                      {benefit.description}
                    </div>
                    <div className="w-3 h-3 rotate-45 mx-auto -mt-1.5" style={{ backgroundColor: benefit.color }}></div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )
        })}

        {/* Comparison Elements */}
        {/* SEO Comparison */}
        <motion.div
          className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 bg-slate-800 rounded-lg border border-amber-500 p-2 shadow-lg w-[180px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -5, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            opacity: {
              duration: 1,
              delay: 1,
            },
          }}
        >
          <div className="text-center text-xs font-bold text-white mb-1">SEO Rankings</div>
          <div className="flex justify-between items-end h-10 mb-1">
            <div className="w-5 bg-amber-500/70 h-4 rounded-t-sm"></div>
            <div className="w-5 bg-amber-500/70 h-5 rounded-t-sm"></div>
            <div className="w-5 bg-amber-500/70 h-6 rounded-t-sm"></div>
            <div className="w-5 bg-primary/70 h-7 rounded-t-sm"></div>
            <div className="w-5 bg-primary/70 h-8 rounded-t-sm"></div>
            <div className="w-5 bg-primary/70 h-10 rounded-t-sm"></div>
          </div>
          <div className="flex justify-between text-[10px]">
            <div className="text-amber-500">Template</div>
            <div className="text-primary">Custom</div>
          </div>
        </motion.div>

        {/* Performance Comparison */}
        <motion.div
          className="absolute top-[15%] right-[10%] bg-slate-800 rounded-lg border border-blue-500 p-2 shadow-lg w-[180px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            },
            opacity: {
              duration: 1,
              delay: 1.5,
            },
          }}
        >
          <div className="text-center text-xs font-bold text-white mb-2">Page Speed</div>
          <div className="flex justify-around">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#64748b" strokeWidth="1" />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="75, 100"
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
                <text x="18" y="20" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                  75%
                </text>
              </svg>
              <div className="text-center text-[10px] text-amber-500 mt-1">Template</div>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#64748b" strokeWidth="1" />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray="95, 100"
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
                <text x="18" y="20" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                  95%
                </text>
              </svg>
              <div className="text-center text-[10px] text-blue-500 mt-1">Custom</div>
            </div>
          </div>
        </motion.div>

        {/* Brand Identity Comparison */}
        <motion.div
          className="absolute top-[15%] left-[10%] bg-slate-800 rounded-lg border border-teal-500 p-2 shadow-lg w-[180px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -5, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            },
            opacity: {
              duration: 1,
              delay: 2,
            },
          }}
        >
          <div className="text-center text-xs font-bold text-white mb-2">Brand Identity</div>
          <div className="flex justify-around mb-1">
            <div className="w-16 h-16 bg-slate-700 rounded-md flex flex-col items-center justify-center">
              <div className="w-10 h-1.5 bg-gray-500 rounded-sm mb-1"></div>
              <div className="w-10 h-1.5 bg-gray-500 rounded-sm mb-1"></div>
              <div className="w-10 h-1.5 bg-gray-500 rounded-sm"></div>
            </div>
            <div className="w-16 h-16 bg-slate-700 rounded-md flex flex-col items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary/70 mb-1"></div>
              <div className="w-10 h-1.5 bg-primary/70 rounded-sm"></div>
            </div>
          </div>
          <div className="flex justify-around text-[10px]">
            <div className="text-gray-400">Generic</div>
            <div className="text-primary">Unique</div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Code snippets */}
          <motion.div
            className="absolute top-[10%] left-[25%] text-xs font-mono text-primary opacity-70"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {"<style>"}
          </motion.div>

          <motion.div
            className="absolute bottom-[20%] right-[20%] text-xs font-mono text-purple-500 opacity-70"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            {"<responsive>"}
          </motion.div>

          <motion.div
            className="absolute top-[30%] right-[30%] text-xs font-mono text-amber-500 opacity-70"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            {"<meta>"}
          </motion.div>

          <motion.div
            className="absolute bottom-[30%] left-[30%] text-xs font-mono text-blue-500 opacity-70"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            {"<script>"}
          </motion.div>

          {/* Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                backgroundColor: benefits[Math.floor(Math.random() * benefits.length)].color,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -20 * Math.random()],
                x: [0, (Math.random() - 0.5) * 20],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

