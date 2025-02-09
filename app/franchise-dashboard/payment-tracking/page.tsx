import type { Metadata } from "next"
import { FranchiseNav } from "@/components/franchise-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { PaymentHistory } from "@/components/payment-history"
import { OutstandingBalances } from "@/components/outstanding-balances"
import { ReceiptsStatements } from "@/components/receipts-statements"

export const metadata: Metadata = {
  title: "Payment Tracking",
  description: "Track payments, balances, and download statements",
}

export default function PaymentTrackingPage() {
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
          <h2 className="text-3xl font-bold tracking-tight">Payment Tracking</h2>
        </div>
        <div className="space-y-4">
          <PaymentHistory />
          <OutstandingBalances />
          <ReceiptsStatements />
        </div>
      </div>
    </div>
  )
}

