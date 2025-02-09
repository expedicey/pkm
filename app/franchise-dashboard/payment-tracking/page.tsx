import type { Metadata } from "next"
import { PaymentHistory } from "@/components/payment-history"
import { OutstandingBalances } from "@/components/outstanding-balances"
import { ReceiptsStatements } from "@/components/receipts-statements"

export const metadata: Metadata = {
  title: "Payment Tracking",
  description: "Track payments, balances, and download statements",
}

export default function PaymentTrackingPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Payment Tracking</h2>
      </div>
      <div className="space-y-4">
        <PaymentHistory />
        <OutstandingBalances />
        <ReceiptsStatements />
      </div>
    </div>
  )
}

