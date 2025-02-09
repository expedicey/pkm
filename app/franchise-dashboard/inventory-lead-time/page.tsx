import type { Metadata } from "next"
import { ItemAvailability } from "@/components/item-availability"
import { LeadTimeDashboard } from "@/components/lead-time-dashboard"
import { ReorderAlerts } from "@/components/reorder-alerts"

export const metadata: Metadata = {
  title: "Inventory & Lead Time Visibility",
  description: "Monitor inventory levels, lead times, and reorder alerts",
}

export default function InventoryLeadTimePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Inventory & Lead Time Visibility</h2>
      </div>
      <div className="space-y-4">
        <ItemAvailability />
        <LeadTimeDashboard />
        <ReorderAlerts />
      </div>
    </div>
  )
}

