"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
  delay?: number
}

export function AnimatedButton({ children, className, delay = 0.5, ...props }: AnimatedButtonProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button className={cn("text-2xl py-10 px-16 rounded-xl bg-white hover:bg-white hover:text-black text-black", className)} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}

