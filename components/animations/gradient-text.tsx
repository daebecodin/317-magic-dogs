"use client"

import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  animationSpeed?: number
  showBorder?: boolean
}

export function GradientText({
  children,
  className,
  colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "200% auto",
    animation: `gradient-animation ${animationSpeed}s linear infinite`,
  }

  if (showBorder) {
    return (
      <div className={cn("p-[2px] rounded-lg h-full", className)} style={gradientStyle}>
        <div className="bg-card text-card-foreground rounded-[calc(var(--radius)-2px)] h-full w-full">
          {children}
        </div>
      </div>
    )
  }

  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        className
      )}
      style={gradientStyle}
    >
      {children}
    </span>
  )
}