"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Lock, Check, ChevronRight, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface BenefitCardProps {
  title: string
  description: string
  icon: LucideIcon
  requiredScore: number
  currentScore: number
  claimed?: boolean
  value?: string
  onClaim?: () => void
  className?: string
}

export function BenefitCard({
  title,
  description,
  icon: Icon,
  requiredScore,
  currentScore,
  claimed = false,
  value,
  onClaim,
  className
}: BenefitCardProps) {
  const isUnlocked = currentScore >= requiredScore
  const progress = Math.min((currentScore / requiredScore) * 100, 100)

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all duration-300",
        "glass hover:bg-card/70",
        isUnlocked && !claimed && "hover:glow-primary cursor-pointer",
        claimed && "opacity-70",
        className
      )}
    >
      {/* Gradient overlay for unlocked */}
      {isUnlocked && !claimed && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className={cn(
            "flex items-center justify-center w-12 h-12 rounded-lg",
            isUnlocked 
              ? "bg-primary/20 text-primary" 
              : "bg-muted text-muted-foreground"
          )}>
            <Icon className="w-6 h-6" />
          </div>

          {value && isUnlocked && (
            <span className="text-lg font-bold text-secondary font-mono">
              {value}
            </span>
          )}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        {/* Progress bar for locked benefits */}
        {!isUnlocked && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-mono text-foreground">
                {currentScore} / {requiredScore}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary/60 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="mt-4">
          {claimed ? (
            <div className="flex items-center gap-2 text-sm text-success">
              <Check className="w-4 h-4" />
              <span>Claimed</span>
            </div>
          ) : isUnlocked ? (
            <Button 
              size="sm" 
              onClick={onClaim}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Claim Benefit
            </Button>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>Requires {requiredScore} score</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface BenefitListItemProps {
  title: string
  icon: LucideIcon
  isUnlocked: boolean
  onClick?: () => void
}

export function BenefitListItem({
  title,
  icon: Icon,
  isUnlocked,
  onClick
}: BenefitListItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={!isUnlocked}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg transition-all",
        isUnlocked 
          ? "hover:bg-muted/50 cursor-pointer" 
          : "opacity-50 cursor-not-allowed"
      )}
    >
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-md",
        isUnlocked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="w-4 h-4" />
      </div>
      <span className={cn(
        "flex-1 text-left text-sm font-medium",
        isUnlocked ? "text-foreground" : "text-muted-foreground"
      )}>
        {title}
      </span>
      {isUnlocked ? (
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      ) : (
        <Lock className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  )
}

