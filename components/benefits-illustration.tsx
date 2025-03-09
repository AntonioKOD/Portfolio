"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface BenefitsIllustrationProps {
  className?: string
  width?: number
  height?: number
}

export function BenefitsIllustration({ className = "", width = 800, height = 500 }: BenefitsIllustrationProps) {
  const [isClient, setIsClient] = useState(false)
  const [activeBenefit, setActiveBenefit] = useState<string | null>(null)
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

  // Define the service benefits
  const benefits = [
    {
      id: "expertise",
      title: "Expert Development",
      description: "Years of experience creating high-quality web solutions",
      icon: "💻",
      color: "#5eead4"
    },
    {
      id: "custom",
      title: "Tailored Solutions",
      description: "Custom-built to your specific business requirements",
      icon: "🔧",
      color: "#a855f7"
    },
    {
      id: "speed",
      title: "Fast Turnaround",
      description: "Efficient development process with timely delivery",
      icon: "⚡",
      color: "#f59e0b"
    },
    {
      id: "support",
      title: "Ongoing Support",
      description: "Continued assistance and maintenance after launch",
      icon: "🛡️",
      color: "#3b82f6"
    },
    {
      id: "modern",
      title: "Modern Technologies",
      description: "Latest frameworks and tools for optimal performance",
      icon: "🚀",
      color: "#f43f5e"
    },
    {
      id: "results",
      title: "Results-Driven",
      description: "Focus on achieving your business objectives",
      icon: "📈",
      color: "#10b981"
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const centerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8
      }
    }
  }

  const benefitVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  return (
    <div 
      ref={ref}
      className={cn("relative rounded-xl overflow-hidden", className)} 
      style={{ width, height }}
    >
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-background/50 to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#5eead410_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <motion.div
        className="relative w-full h-full"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Central hub */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          variants={centerVariants}
        >
          <motion.div 
            className="relative w-40 h-40 rounded-full bg-slate-800 border-4 border-primary flex items-center justify-center shadow-[0_0_30px_rgba(94,234,212,0.3)]"
            animate={{
              boxShadow: [
                "0 0 30px rgba(94, 234, 212, 0.2)",
                "0 0 40px rgba(94, 234, 212, 0.4)",
                "0 0 30px rgba(94, 234, 212, 0.2)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🌟</div>
              <div className="text-primary font-bold">Premium Services</div>
              <div className="text-xs text-white/70 mt-1">Hover to explore</div>
            </div>
            
            {/* Pulsing rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute inset-0 rounded-full border border-primary/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2, 1.2],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5eead4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          {benefits.map((benefit, index) => {
            const angle = (index * Math.PI * 2) / benefits.length;
            const innerRadius = 80; // Center hub radius
            const outerRadius = Math.min(width, height) * 0.35;
            
            const x1 = width / 2 + innerRadius * Math.cos(angle);
            const y1 = height / 2 + innerRadius * Math.sin(angle);
            const x2 = width / 2 + outerRadius * Math.cos(angle);
            const y2 = height / 2 + outerRadius * Math.sin(angle);
            
            const isActive = activeBenefit === benefit.id;
            
            return (
              <motion.path
                key={`line-${benefit.id}`}
                d={`M${x1},${y1} L${x2},${y2}`}
                stroke={isActive ? benefit.color : "url(#lineGradient)"}
                strokeWidth={isActive ? 3 : 2}
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: isActive ? 0.9 : 0.6,
                  strokeWidth: isActive ? 3 : 2
                }}
                transition={{ duration: 1.5 }}
              />
            );
          })}
        </svg>

        {/* Benefit nodes */}
        {benefits.map((benefit, index) => {
          // Calculate positions in a circle around the center
          const angle = (index * Math.PI * 2) / benefits.length;
          const radius = Math.min(width, height) * 0.35;
          const x = width / 2 + radius * Math.cos(angle);
          const y = height / 2 + radius * Math.sin(angle);
          
          const isActive = activeBenefit === benefit.id;

          return (
            <motion.div 
              key={benefit.id}
              className="absolute"
              style={{ 
                left: x, 
                top: y,
                transform: 'translate(-50%, -50%)'
              }}
              variants={benefitVariants}
              onHoverStart={() => setActiveBenefit(benefit.id)}
              onHoverEnd={() => setActiveBenefit(null)}
            >
              <motion.div
                className="relative cursor-pointer"
                animate={{ 
                  scale: isActive ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Benefit node */}
                <motion.div 
                  className="flex items-center justify-center rounded-full shadow-lg"
                  style={{
                    width: isActive ? 80 : 70,
                    height: isActive ? 80 : 70,
                    backgroundColor: '#1e293b',
                    border: `${isActive ? 4 : 2}px solid ${benefit.color}`
                  }}
                  animate={{
                    boxShadow: isActive 
                      ? `0 0 20px ${benefit.color}40` 
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                >
                  <span className="text-3xl">{benefit.icon}</span>
                </motion.div>

                {/* Benefit title */}
                <motion.div
                  className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap"
                  animate={{ 
                    y: isActive ? -5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="px-3 py-1.5 rounded-md text-white text-sm font-semibold"
                    style={{
                      backgroundColor: isActive ? benefit.color : '#1e293b',
                      opacity: isActive ? 0.9 : 0.7
                    }}
                  >
                    {benefit.title}
                  </motion.div>
                </motion.div>

                {/* Tooltip on hover */}
                {isActive && (
                  <motion.div
                    className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div 
                      className="px-4 py-2 rounded-lg text-white text-sm text-center max-w-[220px]"
                      style={{ backgroundColor: benefit.color }}
                    >
                      {benefit.description}
                    </div>
                    <div 
                      className="w-3 h-3 rotate-45 mx-auto -mt-1.5"
                      style={{ backgroundColor: benefit.color }}
                    ></div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )
        })}

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Code snippets */}
          {[
            { text: "<quality>", x: "20%", y: "15%", color: "#5eead4", delay: 0 },
            { text: "function deliver() {", x: "75%", y: "25%", color: "#a855f7", delay: 0.5 },
            { text: "return results;", x: "80%", y: "70%", color: "#f59e0b", delay: 1 },
            { text: "};", x: "15%", y: "80%", color: "#3b82f6", delay: 1.5 }
          ].map((snippet, i) => (
            <motion.div
              key={`snippet-${i}`}
              className="absolute font-mono text-xs"
              style={{ 
                left: snippet.x, 
                top: snippet.y,
                color: snippet.color
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -15, -30]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: snippet.delay,
                ease: "easeInOut"
              }}
            >
              {snippet.text}
            </motion.div>
          ))}
          
          {/* Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                backgroundColor: benefits[Math.floor(Math.random() * benefits.length)].color
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -30 * Math.random()],
                x: [0, (Math.random() - 0.5) * 30]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Service metrics */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center gap-16 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[
            { value: "100+", label: "Projects Completed" },
            { value: "99%", label: "Client Satisfaction" },
            { value: "24/7", label: "Support Available" }
          ].map((metric, i) => (
            <div key={`metric-${i}`} className="text-center">
              <motion.div 
                className="text-2xl font-bold text-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.8 + i * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
              >
                {metric.value}
              </motion.div>
              <div className="text-sm text-white/70">{metric.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
