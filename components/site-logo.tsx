"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SiteLogoProps {
  className?: string
  textSize?: "sm" | "md" | "lg"
  animated?: boolean
}

export function SiteLogo({ className, textSize = "md", animated = true }: SiteLogoProps) {
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    initial: { y: -10, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  const bracketVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      color: "var(--color-primary)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  if (animated) {
    return (
      <Link href="/" className={cn("flex items-center space-x-1", className)}>
        <motion.div
          className="flex items-baseline"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <motion.span
            className={cn("text-2xl font-bold text-primary", textSizeClasses[textSize])}
            variants={bracketVariants}
          >
            {"{ "}
          </motion.span>

          <motion.span className={cn("font-bold tracking-tight", textSizeClasses[textSize])} variants={itemVariants}>
            <motion.span className="text-primary" variants={itemVariants}>
              code
            </motion.span>
            <motion.span variants={itemVariants}>WithToni</motion.span>
          </motion.span>

          <motion.span
            className={cn("text-2xl font-bold text-primary", textSizeClasses[textSize])}
            variants={bracketVariants}
          >
            {" }"}
          </motion.span>
        </motion.div>
      </Link>
    )
  }

  // Non-animated version
  return (
    <Link href="/" className={cn("flex items-center space-x-1", className)}>
      <div className="flex items-baseline">
        <span className={cn("text-2xl font-bold text-primary", textSizeClasses[textSize])}>{"{"}</span>
        <span className={cn("font-bold tracking-tight", textSizeClasses[textSize])}>
          <span className="text-primary">code</span>
          WithToni
        </span>
        <span className={cn("text-2xl font-bold text-primary", textSizeClasses[textSize])}>{"}"}</span>
      </div>
    </Link>
  )
}

