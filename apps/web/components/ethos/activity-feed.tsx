"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, Gift, Shield, Zap, Clock } from "lucide-react"

type ActivityType = "score_increase" | "score_decrease" | "benefit_claimed" | "verification" | "bonus"

interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  value?: string
  timestamp: Date
}

interface ActivityFeedProps {
  activities: Activity[]
  className?: string
}

const activityConfig: Record<ActivityType, { icon: typeof ArrowUpRight; color: string; bg: string }> = {
  score_increase: {
    icon: ArrowUpRight,
    color: "text-success",
    bg: "bg-success/20"
  },
  score_decrease: {
    icon: ArrowDownRight,
    color: "text-destructive",
    bg: "bg-destructive/20"
  },
  benefit_claimed: {
    icon: Gift,
    color: "text-secondary",
    bg: "bg-secondary/20"
  },
  verification: {
    icon: Shield,
    color: "text-primary",
    bg: "bg-primary/20"
  },
  bonus: {
    icon: Zap,
    color: "text-warning",
    bg: "bg-warning/20"
  }
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return date.toLocaleDateString()
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {activities.map((activity, index) => {
        const config = activityConfig[activity.type]
        const Icon = config.icon

        return (
          <div
            key={activity.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-muted/30",
              index === 0 && "animate-in fade-in-0 slide-in-from-top-2 duration-300"
            )}
          >
            <div className={cn(
              "flex items-center justify-center w-9 h-9 rounded-lg shrink-0",
              config.bg
            )}>
              <Icon className={cn("w-4 h-4", config.color)} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.title}
                </p>
                {activity.value && (
                  <span className={cn(
                    "text-sm font-mono font-semibold shrink-0",
                    activity.type === "score_increase" && "text-success",
                    activity.type === "score_decrease" && "text-destructive",
                    activity.type !== "score_increase" && activity.type !== "score_decrease" && config.color
                  )}>
                    {activity.value}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-muted-foreground truncate">
                  {activity.description}
                </p>
                <span className="text-xs text-muted-foreground/60 shrink-0">
                  {formatRelativeTime(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
        )
      })}

      {activities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Clock className="w-8 h-8 mb-2 opacity-50" />
          <p className="text-sm">No recent activity</p>
        </div>
      )}
    </div>
  )
}

