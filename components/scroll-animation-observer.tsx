"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ScrollAnimationObserverProps {
  children: React.ReactNode
  className?: string
  animation?: "fade-in" | "fade-up" | "fade-down" | "fade-left" | "fade-right"
  threshold?: number
  delay?: number
}

export function ScrollAnimationObserver({
  children,
  className,
  animation = "fade-in",
  threshold = 0.1,
  delay = 0,
}: ScrollAnimationObserverProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(`animate-${animation}`)
            }, delay)
          }
        })
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const element = ref.current

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [animation, threshold, delay])

  return (
    <div
      ref={ref}
      className={cn(
        "animate-on-scroll",
        animation === "fade-up" && "translate-y-10",
        animation === "fade-down" && "-translate-y-10",
        animation === "fade-left" && "translate-x-10",
        animation === "fade-right" && "-translate-x-10",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

