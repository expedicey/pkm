import type { Metadata } from "next"
import { OrdersTable } from "@/components/orders-table"
import { MainNav } from "@/components/main-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"

export const metadata: Metadata = {
  title: "Orders Management",
  description: "Manage orders across all franchises",
}

export default function OrdersPage() {
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
          <h2 className="text-3xl font-bold tracking-tight">Orders Management</h2>
        </div>
        <div className="space-y-4">
          <OrdersTable />
        </div>
      </div>
    </div>
  )
}

