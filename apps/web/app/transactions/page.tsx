"use client"

import { useState } from "react"
import { Header } from "@/components/ethos/header"
import { TransactionTable } from "@/components/ethos/transaction-table"
import { StatsCard } from "@/components/ethos/stats-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Search,
  Filter,
  Download,
  History,
  TrendingUp,
  Activity
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

const mockUser = {
  address: "0x1234567890abcdef1234567890abcdef12345678"
}

const mockTransactions = [
  {
    id: "1",
    type: "receive" as const,
    hash: "0xabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab",
    amount: "2.5",
    token: "ETH",
    status: "completed" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: "2",
    type: "send" as const,
    hash: "0xdef01234567890abcdef1234567890abcdef1234567890abcdef1234567890cd",
    amount: "1,500",
    token: "USDC",
    status: "completed" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: "3",
    type: "claim" as const,
    hash: "0x12341234567890abcdef1234567890abcdef1234567890abcdef1234567890ef",
    amount: "50",
    token: "ETHOS",
    status: "completed" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5)
  },
  {
    id: "4",
    type: "stake" as const,
    hash: "0x56781234567890abcdef1234567890abcdef1234567890abcdef123456789012",
    amount: "1,000",
    token: "ETHOS",
    status: "pending" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8)
  },
  {
    id: "5",
    type: "receive" as const,
    hash: "0x90ab1234567890abcdef1234567890abcdef1234567890abcdef123456789034",
    amount: "0.8",
    token: "ETH",
    status: "completed" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: "6",
    type: "send" as const,
    hash: "0xcdef1234567890abcdef1234567890abcdef1234567890abcdef123456789056",
    amount: "500",
    token: "USDT",
    status: "failed" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48)
  },
  {
    id: "7",
    type: "claim" as const,
    hash: "0x12ab1234567890abcdef1234567890abcdef1234567890abcdef123456789078",
    amount: "25",
    token: "ETHOS",
    status: "completed" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72)
  },
  {
    id: "8",
    type: "receive" as const,
    hash: "0x34cd1234567890abcdef1234567890abcdef1234567890abcdef12345678909a",
    amount: "3.2",
    token: "ETH",
    status: "completed" as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96)
  }
]

function TransactionsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  useSearchParams()

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch = tx.hash.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || tx.type === typeFilter
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
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
                <History className="w-7 h-7 text-primary" />
                Transactions
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your on-chain activity and benefit claims
              </p>
            </div>
            <Button variant="outline" className="gap-2 glass bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatsCard title="Total Transactions" value={mockTransactions.length} icon={Activity} />
            <StatsCard title="Completed" value={mockTransactions.filter(t => t.status === "completed").length} icon={TrendingUp} variant="primary" />
            <StatsCard title="Pending" value={mockTransactions.filter(t => t.status === "pending").length} icon={History} variant="secondary" />
          </div>

          {/* Controls */}
          <div className="glass rounded-2xl p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by transaction hash..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="md:col-span-3">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="send">Send</SelectItem>
                    <SelectItem value="receive">Receive</SelectItem>
                    <SelectItem value="claim">Claim</SelectItem>
                    <SelectItem value="stake">Stake</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="w-3.5 h-3.5" />
              Showing {filteredTransactions.length} transactions
            </div>
          </div>

          {/* Table */}
          <div className="glass rounded-2xl p-0 overflow-hidden">
            <TransactionTable transactions={filteredTransactions} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TransactionsContent />
    </Suspense>
  )
}

