import type { Metadata } from "next"
import { InventoryTable } from "@/components/inventory-table"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { LeadTimeSettings } from "@/components/lead-time-settings"
import { RealTimeInventory } from "@/components/real-time-inventory"
import { SupplierDashboard } from "@/components/supplier-dashboard"
import { WasteTracking } from "@/components/waste-tracking"

export const metadata: Metadata = {
  title: "Inventory & Supplier Management",
  description: "Manage inventory, suppliers, and waste across all franchises",
}

export default function InventoryPage() {
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
          <h2 className="text-3xl font-bold tracking-tight">Inventory & Supplier Management</h2>
        </div>
        <div className="space-y-4">
          <RealTimeInventory />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <SupplierDashboard />
            <WasteTracking />
          </div>
          <InventoryTable />
          <LeadTimeSettings />
        </div>
      </div>
    </div>
  )
}

