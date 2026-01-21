"use client"

import { useState } from "react"
import { Header } from "@/components/ethos/header"
import { ScoreDisplay } from "@/components/ethos/score-display"
import { StatsCard } from "@/components/ethos/stats-card"
import { BenefitCard, BenefitListItem } from "@/components/ethos/benefit-card"
import { ActivityFeed } from "@/components/ethos/activity-feed"
import { MetricsChart } from "@/components/ethos/metrics-chart"
import { Button } from "@/components/ui/button"
import { 
  Wallet, 
  TrendingUp, 
  Gift, 
  Zap,
  Percent,
  Users,
  Trophy,
  ChevronRight
} from "lucide-react"

// Mock data
const mockUser = {
  address: "0x1234567890abcdef1234567890abcdef12345678",
  score: 1750,
  tier: "Platinum",
  trend: 125,
  benefits: 8,
  totalEarned: "$2,450"
}

const mockActivities = [
  {
    id: "1",
    type: "score_increase" as const,
    title: "On-chain Activity Bonus",
    description: "Completed 10 transactions this week",
    value: "+50",
    timestamp: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: "2",
    type: "benefit_claimed" as const,
    title: "Gas Fee Discount",
    description: "Claimed 20% gas discount benefit",
    value: "20%",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: "3",
    type: "verification" as const,
    title: "Social Verification",
    description: "Verified Twitter account @user",
    value: "+100",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: "4",
    type: "bonus" as const,
    title: "Weekly Streak Bonus",
    description: "Maintained 4-week activity streak",
    value: "+75",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48)
  },
  {
    id: "5",
    type: "score_decrease" as const,
    title: "Inactivity Penalty",
    description: "No transactions for 7 days",
    value: "-25",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72)
  }
]

const mockBenefits = [
  {
    id: "1",
    title: "Gas Fee Discount",
    description: "Get 20% off on all transaction fees across supported protocols",
    icon: Percent,
    requiredScore: 500,
    value: "20% off"
  },
  {
    id: "2",
    title: "Priority Access",
    description: "Early access to new DeFi protocols and token launches",
    icon: Zap,
    requiredScore: 1000,
    value: "Active"
  },
  {
    id: "3",
    title: "Premium NFT Drops",
    description: "Exclusive access to partner NFT collections and airdrops",
    icon: Gift,
    requiredScore: 1500,
    value: "3 Available"
  },
  {
    id: "4",
    title: "DAO Voting Power",
    description: "Enhanced voting weight in partner DAOs",
    icon: Users,
    requiredScore: 2000
  }
]

const mockChartData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
  value: 1200 + Math.floor(Math.random() * 200) + i * 15
}))

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(true)
  const [address, setAddress] = useState<string | undefined>(mockUser.address)

  const handleConnect = () => {
    setIsConnected(true)
    setAddress(mockUser.address)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setAddress(undefined)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header onConnect={handleConnect} />
        <main className="pt-16">
          <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
            <div className="max-w-md text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                <Wallet className="w-10 h-10 text-background" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                Welcome to EthosSphere
              </h1>
              <p className="text-muted-foreground mb-8">
                Build your on-chain reputation and unlock exclusive benefits across the Web3 ecosystem. Connect your wallet to get started.
              </p>
              <Button 
                size="lg" 
                onClick={handleConnect}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        address={address} 
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Welcome back
            </h1>
            <p className="text-muted-foreground mt-1">
              Your reputation is looking strong today.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Score & Stats */}
            <div className="lg:col-span-4 space-y-6">
              {/* Score Card */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Ethos Score</h2>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <ScoreDisplay
                  score={mockUser.score}
                  maxScore={2000}
                  trend={mockUser.trend}
                  tier={mockUser.tier}
                  size="md"
                  className="mx-auto"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <StatsCard
                  title="Active Benefits"
                  value={mockUser.benefits}
                  icon={Gift}
                  variant="primary"
                />
                <StatsCard
                  title="Total Earned"
                  value={mockUser.totalEarned}
                  icon={TrendingUp}
                  variant="secondary"
                  trend={{ value: 12, label: "vs last month" }}
                />
              </div>

              {/* Quick Benefits */}
              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Quick Access</h3>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    View All
                  </Button>
                </div>
                <div className="space-y-1">
                  <BenefitListItem
                    title="Gas Discount"
                    icon={Percent}
                    isUnlocked={true}
                  />
                  <BenefitListItem
                    title="Priority Access"
                    icon={Zap}
                    isUnlocked={true}
                  />
                  <BenefitListItem
                    title="DAO Voting"
                    icon={Users}
                    isUnlocked={false}
                  />
                </div>
              </div>
            </div>

            {/* Center Column - Chart & Activity */}
            <div className="lg:col-span-5 space-y-6">
              {/* Score History Chart */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Score History</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-xs">7D</Button>
                    <Button variant="secondary" size="sm" className="text-xs">30D</Button>
                    <Button variant="ghost" size="sm" className="text-xs">90D</Button>
                  </div>
                </div>
                <MetricsChart
                  data={mockChartData}
                  valueLabel="Score"
                  color="primary"
                />
              </div>

              {/* Activity Feed */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Recent Activity</h2>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <ActivityFeed activities={mockActivities} />
              </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Available Benefits</h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  <Trophy className="w-4 h-4 mr-1" />
                  All Benefits
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockBenefits.map((benefit) => (
                  <BenefitCard
                    key={benefit.id}
                    title={benefit.title}
                    description={benefit.description}
                    icon={benefit.icon}
                    requiredScore={benefit.requiredScore}
                    currentScore={mockUser.score}
                    value={benefit.value}
                    claimed={benefit.requiredScore <= 500}
                    onClaim={() => console.log(`Claiming ${benefit.title}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

