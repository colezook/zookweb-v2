"use client"

import { cn } from "@/lib/utils"
import React, { ReactNode } from "react"

interface DotBackgroundProps {
  children: ReactNode
  className?: string
}

export function DotBackground({
  children,
  className,
}: DotBackgroundProps) {
  return (
    <div className={cn("relative w-full min-h-screen bg-black", className)}>
      {/* Dot pattern background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(rgba(68,68,68,0.5)_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(rgba(80,80,80,0.5)_1px,transparent_1px)]",
        )}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

