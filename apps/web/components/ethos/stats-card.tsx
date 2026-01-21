"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  variant?: "default" | "primary" | "secondary"
  className?: string
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className
}: StatsCardProps) {
  const variants = {
    default: {
      container: "glass",
      icon: "bg-muted text-muted-foreground",
      value: "text-foreground"
    },
    primary: {
      container: "glass bg-gradient-to-br from-primary/10 to-transparent",
      icon: "bg-primary/20 text-primary",
      value: "text-primary"
    },
    secondary: {
      container: "glass bg-gradient-to-br from-secondary/10 to-transparent",
      icon: "bg-secondary/20 text-secondary",
      value: "text-secondary"
    }
  }

  const styles = variants[variant]

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl p-5 transition-all hover:bg-card/70",
      styles.container,
      className
    )}>
      <div className="flex items-start justify-between">
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg",
          styles.icon
        )}>
          <Icon className="w-5 h-5" />
        </div>

        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium",
            trend.value >= 0 ? "text-success" : "text-destructive"
          )}>
            <span>{trend.value >= 0 ? "+" : ""}{trend.value}%</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className={cn("text-2xl font-bold font-mono mt-1", styles.value)}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">{trend.label}</p>
        )}
      </div>
    </div>
  )
}

