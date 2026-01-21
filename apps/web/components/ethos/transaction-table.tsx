"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"

type TransactionStatus = "pending" | "completed" | "failed"
type TransactionType = "send" | "receive" | "claim" | "stake"

interface Transaction {
  id: string
  type: TransactionType
  hash: string
  amount: string
  token: string
  status: TransactionStatus
  timestamp: Date
  from?: string
  to?: string
}

interface TransactionTableProps {
  transactions: Transaction[]
  className?: string
}

const statusConfig: Record<TransactionStatus, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  pending: { label: "Pending", variant: "secondary" },
  completed: { label: "Completed", variant: "default" },
  failed: { label: "Failed", variant: "destructive" }
}

const typeConfig: Record<TransactionType, { label: string; icon: typeof ArrowUpRight; color: string }> = {
  send: { label: "Sent", icon: ArrowUpRight, color: "text-destructive" },
  receive: { label: "Received", icon: ArrowDownRight, color: "text-success" },
  claim: { label: "Claimed", icon: ArrowDownRight, color: "text-secondary" },
  stake: { label: "Staked", icon: RefreshCw, color: "text-primary" }
}

function truncateHash(hash: string): string {
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date)
}

export function TransactionTable({ transactions, className }: TransactionTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Type
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Transaction
            </th>
            <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Amount
            </th>
            <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Status
            </th>
            <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Date
            </th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {transactions.map((tx) => {
            const typeInfo = typeConfig[tx.type]
            const statusInfo = statusConfig[tx.status]
            const Icon = typeInfo.icon

            return (
              <tr 
                key={tx.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg bg-muted"
                    )}>
                      <Icon className={cn("w-4 h-4", typeInfo.color)} />
                    </div>
                    <span className="text-sm font-medium">{typeInfo.label}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-mono text-sm text-muted-foreground">
                    {truncateHash(tx.hash)}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={cn("font-mono text-sm font-medium", typeInfo.color)}>
                    {tx.type === "send" ? "-" : "+"}{tx.amount} {tx.token}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <Badge 
                    variant={statusInfo.variant}
                    className={cn(
                      "font-normal",
                      tx.status === "pending" && "animate-pulse"
                    )}
                  >
                    {statusInfo.label}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(tx.timestamp)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => window.open(`https://basescan.org/tx/${tx.hash}`, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {transactions.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <p>No transactions found</p>
        </div>
      )}
    </div>
  )
}

