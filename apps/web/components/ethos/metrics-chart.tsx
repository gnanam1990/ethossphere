"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface DataPoint {
  date: string
  value: number
}

interface MetricsChartProps {
  data: DataPoint[]
  title?: string
  valueLabel?: string
  color?: "primary" | "secondary" | "success"
  className?: string
}

const colorConfig = {
  primary: {
    stroke: "hsl(280, 60%, 65%)",
    fill: "url(#primaryGradient)",
    gradient: ["hsl(280, 60%, 65%)", "hsl(280, 60%, 65% / 0)"]
  },
  secondary: {
    stroke: "hsl(170, 100%, 50%)",
    fill: "url(#secondaryGradient)",
    gradient: ["hsl(170, 100%, 50%)", "hsl(170, 100%, 50% / 0)"]
  },
  success: {
    stroke: "hsl(160, 100%, 50%)",
    fill: "url(#successGradient)",
    gradient: ["hsl(160, 100%, 50%)", "hsl(160, 100%, 50% / 0)"]
  }
}

export function MetricsChart({
  data,
  title,
  valueLabel = "Score",
  color = "primary",
  className
}: MetricsChartProps) {
  const colors = colorConfig[color]
  const gradientId = `${color}Gradient`

  const { minValue, maxValue } = useMemo(() => {
    const values = data.map(d => d.value)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const padding = (max - min) * 0.1
    return {
      minValue: Math.max(0, min - padding),
      maxValue: max + padding
    }
  }, [data])

  return (
    <div className={cn("w-full", className)}>
      {title && (
        <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>
      )}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.gradient[0]} stopOpacity={0.3} />
                <stop offset="100%" stopColor={colors.gradient[1]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <YAxis
              domain={[minValue, maxValue]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length || label == null) return null
                const date = new Date(String(label))
                return (
                  <div className="glass-heavy rounded-lg px-3 py-2 shadow-lg">
                    <p className="text-xs text-muted-foreground">
                      {date.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {valueLabel}: {Number(payload[0].value ?? 0).toLocaleString()}
                    </p>
                  </div>
                )
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors.stroke}
              strokeWidth={2}
              fill={colors.fill}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

