"use client"

import type React from "react"

import { motion } from "framer-motion"

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function AnimatedSection({ children, delay = 0, className = "" }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

