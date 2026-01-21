"use client"

import { useState } from "react"
import { Header } from "@/components/ethos/header"
import { BenefitCard } from "@/components/ethos/benefit-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Percent,
  Zap,
  Gift,
  Users,
  CreditCard,
  Shield,
  Sparkles,
  Crown,
  Rocket,
  Search,
  Filter,
  Trophy
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

const mockUser = {
  address: "0x1234567890abcdef1234567890abcdef12345678",
  score: 1750
}

const allBenefits = [
  {
    id: "1",
    title: "Gas Fee Discount",
    description: "Get 20% off on all transaction fees across supported protocols and chains",
    icon: Percent,
    requiredScore: 500,
    value: "20% off",
    category: "Discounts",
    claimed: true
  },
  {
    id: "2",
    title: "Priority Access",
    description: "Early access to new DeFi protocols, token launches, and exclusive features",
    icon: Zap,
    requiredScore: 1000,
    value: "Active",
    category: "Access"
  },
  {
    id: "3",
    title: "Premium NFT Drops",
    description: "Exclusive access to partner NFT collections, airdrops, and whitelist spots",
    icon: Gift,
    requiredScore: 1500,
    value: "3 Available",
    category: "NFTs"
  },
  {
    id: "4",
    title: "DAO Voting Power",
    description: "Enhanced voting weight in partner DAOs and governance decisions",
    icon: Users,
    requiredScore: 2000,
    category: "Governance"
  },
  {
    id: "5",
    title: "Premium Credit Line",
    description: "Access to higher lending limits with reduced collateral requirements",
    icon: CreditCard,
    requiredScore: 750,
    value: "Up to $50K",
    category: "DeFi"
  },
  {
    id: "6",
    title: "Security Insurance",
    description: "Free smart contract insurance coverage for your transactions",
    icon: Shield,
    requiredScore: 1200,
    value: "$10K Coverage",
    category: "Security"
  },
  {
    id: "7",
    title: "Exclusive Rewards",
    description: "Additional token rewards and cashback on eligible transactions",
    icon: Sparkles,
    requiredScore: 600,
    value: "5% Extra",
    category: "Rewards",
    claimed: true
  },
  {
    id: "8",
    title: "VIP Support",
    description: "24/7 priority customer support with dedicated account manager",
    icon: Crown,
    requiredScore: 1800,
    value: "Active",
    category: "Support"
  },
  {
    id: "9",
    title: "Launch Pad Access",
    description: "Guaranteed allocation in partner IDOs and token launches",
    icon: Rocket,
    requiredScore: 1600,
    category: "Access"
  }
]

const categories = ["All", "Discounts", "Access", "DeFi", "NFTs", "Governance", "Rewards", "Security", "Support"]

function BenefitsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  useSearchParams()

  const filteredBenefits = allBenefits.filter((benefit) => {
    const matchesSearch = benefit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      benefit.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || benefit.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Header address={mockUser.address} />

      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
                <Trophy className="w-7 h-7 text-primary" />
                Benefits
              </h1>
              <p className="text-muted-foreground mt-1">
                Unlock exclusive perks based on your Ethos score
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                Score: {mockUser.score.toLocaleString()}
              </Badge>
            </div>
          </div>

          {/* Controls */}
          <div className="glass rounded-2xl p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search benefits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBenefits.map((benefit) => (
              <BenefitCard
                key={benefit.id}
                title={benefit.title}
                description={benefit.description}
                icon={benefit.icon}
                requiredScore={benefit.requiredScore}
                currentScore={mockUser.score}
                claimed={benefit.claimed}
                value={benefit.value}
                onClaim={() => console.log("claim", benefit.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function BenefitsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BenefitsContent />
    </Suspense>
  )
}

