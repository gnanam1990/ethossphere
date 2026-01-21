"use client"

import { Header } from "@/components/ethos/header"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header address={"0x1234567890abcdef1234567890abcdef12345678"} />
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-1">Coming soon</p>
          </div>
        </div>
      </main>
    </div>
  )
}

