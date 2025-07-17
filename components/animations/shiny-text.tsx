"use client"

import { cn } from "@/lib/utils"

interface ShinyTextProps {
  children: React.ReactNode
  className?: string
}

export function ShinyText({ children, className }: ShinyTextProps) {
  return (
    <span
      className={cn(
        "relative shiny-text",
        className
      )}
    >
      {children}
    </span>
  )
}