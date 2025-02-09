import type { Metadata } from "next"
import { FranchiseNav } from "@/components/franchise-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { FranchisePerformance } from "@/components/franchise-performance"
import { ProductionInsights } from "@/components/production-insights"

export const metadata: Metadata = {
  title: "Analytics & Reports",
  description: "View franchise performance and production insights",
}

export default function AnalyticsReportsPage() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <FranchiseNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
        </div>
        <div className="space-y-4">
          <FranchisePerformance />
          <ProductionInsights />
        </div>
      </div>
    </div>
  )
}

