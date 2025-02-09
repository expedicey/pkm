import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { UnifiedPaymentReconciliation } from "@/components/unified-payment-reconciliation"
import { RevenueAndCostAnalytics } from "@/components/revenue-and-cost-analytics"
import { InvoiceGeneration } from "@/components/invoice-generation"

export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "Manage payments, revenue, and invoices across all franchises",
}

export default function FinancePage() {
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
          <h2 className="text-3xl font-bold tracking-tight">Finance Dashboard</h2>
        </div>
        <div className="space-y-4">
          <UnifiedPaymentReconciliation />
          <RevenueAndCostAnalytics />
          <InvoiceGeneration />
        </div>
      </div>
    </div>
  )
}

