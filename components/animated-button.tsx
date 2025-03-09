"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
  className?: string
  glowEffect?: boolean
}

export function AnimatedButton({ children, className, glowEffect = true, ...props }: AnimatedButtonProps) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        glowEffect && "hover:shadow-[0_0_15px_rgba(94,234,212,0.5)]",
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>

      {/* Background animation */}
      <span className="absolute inset-0 translate-y-full bg-gradient-to-tr from-primary/80 to-accent/80 transition-transform duration-300 group-hover:translate-y-0" />
    </Button>
  )
}

