import type { Metadata } from "next"
import { NewOrderForm } from "@/components/new-order-form"
import { OrderStatusTracking } from "@/components/order-status-tracking"

export const metadata: Metadata = {
  title: "Order Management",
  description: "Manage and place new orders for your franchise",
}

export default function OrderManagementPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Order Management</h2>
      </div>
      <div className="space-y-4">
        <NewOrderForm />
        <OrderStatusTracking />
      </div>
    </div>
  )
}

