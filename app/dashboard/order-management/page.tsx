import type { Metadata } from "next"
import { AllFranchiseOrders } from "@/components/all-franchise-orders"
import { ProductionSchedule } from "@/components/production-schedule"
import { LeadTimeManagement } from "@/components/lead-time-management"
import { ExceptionHandling } from "@/components/exception-handling"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"

export const metadata: Metadata = {
  title: "Order Management & Production Control",
  description: "Manage orders and production across all franchises",
}

export default function OrderManagementPage() {
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
          <h2 className="text-3xl font-bold tracking-tight">Order Management & Production Control</h2>
        </div>
        <div className="space-y-4">
          <AllFranchiseOrders />
          <ProductionSchedule />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <LeadTimeManagement />
            <ExceptionHandling />
          </div>
        </div>
      </div>
    </div>
  )
}

