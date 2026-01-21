"use client"

import { Header } from "@/components/ethos/header"
import { ScoreDisplay } from "@/components/ethos/score-display"
import { MetricsChart } from "@/components/ethos/metrics-chart"
import { StatsCard } from "@/components/ethos/stats-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Copy,
  ExternalLink,
  Check,
  Twitter,
  Github,
  Globe,
  TrendingUp,
  Gift,
  History,
  Wallet,
  Calendar,
  Target,
  Award
} from "lucide-react"
import { useState } from "react"

const mockUser = {
  address: "0x1234567890abcdef1234567890abcdef12345678",
  score: 1750,
  tier: "Platinum",
  trend: 125,
  joinedDate: "2024-03-15",
  totalTransactions: 847,
  totalBenefitsClaimed: 12,
  totalEarned: "$2,450",
  verifications: [
    { type: "wallet", verified: true },
    { type: "twitter", verified: true, handle: "@ethosuser" },
    { type: "github", verified: true, handle: "ethosdev" },
    { type: "ens", verified: true, name: "ethos.eth" }
  ],
  scoreBreakdown: [
    { label: "Transaction History", value: 450, max: 600 },
    { label: "Account Age", value: 200, max: 200 },
    { label: "Social Verification", value: 350, max: 400 },
    { label: "DeFi Activity", value: 400, max: 500 },
    { label: "NFT Holdings", value: 200, max: 200 },
    { label: "Governance", value: 150, max: 300 }
  ]
}

const mockChartData = Array.from({ length: 90 }, (_, i) => ({
  date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString(),
  value: 800 + Math.floor(Math.random() * 150) + i * 10
}))

const tierProgress = {
  current: "Platinum",
  next: "Diamond",
  currentMin: 1500,
  nextMin: 2000
}

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export default function ProfilePage() {
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(mockUser.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const progressToNext = ((mockUser.score - tierProgress.currentMin) / (tierProgress.nextMin - tierProgress.currentMin)) * 100

  return (
    <div className="min-h-screen bg-background">
      <Header address={mockUser.address} />

      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="glass rounded-2xl p-6 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                  <span className="text-3xl font-bold text-background">
                    {mockUser.address.slice(2, 4).toUpperCase()}
                  </span>
                </div>
                <Badge className="absolute -bottom-2 -right-2 bg-cyan-500 text-background border-0">
                  {mockUser.tier}
                </Badge>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <h1 className="text-xl font-bold font-mono">
                    {truncateAddress(mockUser.address)}
                  </h1>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={copyAddress}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => window.open(`https://basescan.org/address/${mockUser.address}`, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(mockUser.joinedDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <History className="w-4 h-4" />
                    {mockUser.totalTransactions} tx
                  </div>
                  <div className="flex items-center gap-1">
                    <Gift className="w-4 h-4" />
                    {mockUser.totalBenefitsClaimed} benefits
                  </div>
                </div>

                {/* Verifications */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  {mockUser.verifications.map((v) => (
                    <Badge key={v.type} variant="outline" className="gap-1">
                      {v.type === "wallet" && <Wallet className="w-3 h-3" />}
                      {v.type === "twitter" && <Twitter className="w-3 h-3" />}
                      {v.type === "github" && <Github className="w-3 h-3" />}
                      {v.type === "ens" && <Globe className="w-3 h-3" />}
                      Verified
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Score */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Ethos Score</h2>
                  <Badge variant="secondary" className="font-mono">
                    +{mockUser.trend}
                  </Badge>
                </div>
                <ScoreDisplay score={mockUser.score} maxScore={2000} tier={mockUser.tier} trend={mockUser.trend} />

                {/* Tier progress */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress to {tierProgress.next}</span>
                    <span className="font-mono">{mockUser.score}/{tierProgress.nextMin}</span>
                  </div>
                  <Progress value={progressToNext} />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4">
                <StatsCard title="Total Earned" value={mockUser.totalEarned} icon={TrendingUp} variant="secondary" />
                <StatsCard title="Benefits Claimed" value={mockUser.totalBenefitsClaimed} icon={Gift} variant="primary" />
              </div>
            </div>

            {/* Center/Right */}
            <div className="lg:col-span-8 space-y-6">
              {/* History chart */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Score History</h2>
                    <p className="text-sm text-muted-foreground">Last 90 days</p>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Target className="w-3 h-3" />
                    Trending up
                  </Badge>
                </div>
                <MetricsChart data={mockChartData} valueLabel="Score" color="primary" />
              </div>

              {/* Breakdown */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Score Breakdown</h2>
                    <p className="text-sm text-muted-foreground">How your score is calculated</p>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Award className="w-3 h-3" />
                    Transparent
                  </Badge>
                </div>

                <div className="space-y-4">
                  {mockUser.scoreBreakdown.map((row) => {
                    const pct = (row.value / row.max) * 100
                    return (
                      <div key={row.label}>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-foreground">{row.label}</span>
                          <span className="font-mono text-muted-foreground">
                            {row.value}/{row.max}
                          </span>
                        </div>
                        <Progress value={pct} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

