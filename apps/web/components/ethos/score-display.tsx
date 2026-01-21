"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface ScoreDisplayProps {
  score: number
  maxScore?: number
  trend?: number
  tier: string
  animated?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const tierColors: Record<string, { ring: string; glow: string; badge: string }> = {
  Bronze: {
    ring: "stroke-amber-600",
    glow: "drop-shadow-[0_0_15px_rgba(180,83,9,0.4)]",
    badge: "bg-amber-600/20 text-amber-500 border-amber-600/30"
  },
  Silver: {
    ring: "stroke-slate-400",
    glow: "drop-shadow-[0_0_15px_rgba(148,163,184,0.4)]",
    badge: "bg-slate-400/20 text-slate-300 border-slate-400/30"
  },
  Gold: {
    ring: "stroke-yellow-500",
    glow: "drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]",
    badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  },
  Platinum: {
    ring: "stroke-cyan-400",
    glow: "drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]",
    badge: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30"
  },
  Diamond: {
    ring: "stroke-primary",
    glow: "drop-shadow-[0_0_20px_rgba(110,86,207,0.5)]",
    badge: "bg-primary/20 text-primary border-primary/30"
  },
  Elite: {
    ring: "stroke-secondary",
    glow: "drop-shadow-[0_0_25px_rgba(0,255,209,0.5)]",
    badge: "bg-secondary/20 text-secondary border-secondary/30"
  }
}

const sizeConfig = {
  sm: { container: "w-32 h-32", text: "text-2xl", subtext: "text-xs", strokeWidth: 6 },
  md: { container: "w-48 h-48", text: "text-4xl", subtext: "text-sm", strokeWidth: 8 },
  lg: { container: "w-64 h-64", text: "text-5xl", subtext: "text-base", strokeWidth: 10 }
}

export function ScoreDisplay({
  score,
  maxScore = 2000,
  trend = 0,
  tier,
  animated = true,
  size = "md",
  className
}: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score)
  const [progress, setProgress] = useState(animated ? 0 : (score / maxScore) * 100)
  
  const config = sizeConfig[size]
  const colors = tierColors[tier] || tierColors.Bronze
  
  const radius = size === "sm" ? 52 : size === "md" ? 80 : 108
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  useEffect(() => {
    if (!animated) return
    
    const duration = 1500
    const startTime = Date.now()
    const startScore = 0
    const targetScore = score
    const startProgress = 0
    const targetProgress = (score / maxScore) * 100

    const animate = () => {
      const elapsed = Date.now() - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic

      setDisplayScore(Math.round(startScore + (targetScore - startScore) * eased))
      setProgress(startProgress + (targetProgress - startProgress) * eased)

      if (t < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [score, maxScore, animated])

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div className={cn("relative", config.container)}>
        {/* Background ring */}
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 240 240">
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            className="text-muted/30"
          />
          {/* Progress ring */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            className={cn(colors.ring, colors.glow, "transition-all duration-300")}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold font-mono tracking-tight", config.text)}>
            {displayScore.toLocaleString()}
          </span>
          <span className={cn("text-muted-foreground", config.subtext)}>
            / {maxScore.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Tier badge and trend */}
      <div className="mt-4 flex items-center gap-3">
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-semibold border",
          colors.badge
        )}>
          {tier}
        </span>
        
        {trend !== 0 && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            trend > 0 ? "text-success" : "text-destructive"
          )}>
            {trend > 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : trend < 0 ? (
              <TrendingDown className="w-4 h-4" />
            ) : (
              <Minus className="w-4 h-4" />
            )}
            <span>{trend > 0 ? "+" : ""}{trend}</span>
          </div>
        )}
      </div>
    </div>
  )
}

