"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function AnimatedCard({ children, delay = 0, className = "" }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 255, 170, 0.2)" }}
      className={cn(
        "bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

