import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { FranchiseAnalyticsDashboard } from "@/components/franchise-analytics-dashboard"
import { TrendAnalysis } from "@/components/trend-analysis"
import { ComplianceMonitoring } from "@/components/compliance-monitoring"

export const metadata: Metadata = {
  title: "Franchise Performance Monitoring",
  description: "Monitor franchise performance, trends, and compliance",
}

export default function FranchisePerformancePage() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Franchise Performance Monitoring</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FranchiseAnalyticsDashboard />
          <TrendAnalysis />
          <ComplianceMonitoring />
        </div>
      </div>
    </div>
  )
}

