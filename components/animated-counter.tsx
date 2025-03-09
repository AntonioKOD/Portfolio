"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  label: string
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
}

export function AnimatedCounter({
  value,
  label,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const totalDuration = duration * 1000
      const incrementTime = totalDuration / end

      setTimeout(() => {
        const timer = setInterval(() => {
          start += 1
          setCount(start)
          if (start >= end) clearInterval(timer)
        }, incrementTime)

        return () => clearInterval(timer)
      }, delay * 1000)
    }
  }, [isInView, value, duration, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-primary mb-2">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </motion.div>
  )
}

