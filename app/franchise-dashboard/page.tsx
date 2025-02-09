import type { Metadata } from "next"
import { FranchiseOverview } from "@/components/franchise-overview"
import { FranchiseInventory } from "@/components/franchise-inventory"
import { FranchiseOrders } from "@/components/franchise-orders"
import { Announcements } from "@/components/announcements"

export const metadata: Metadata = {
  title: "Franchise Dashboard",
  description: "Manage your franchise operations",
}

export default function FranchiseDashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Franchise Dashboard</h2>
      </div>
      <Announcements />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <FranchiseOverview />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <FranchiseInventory />
        <FranchiseOrders />
      </div>
    </>
  )
}

