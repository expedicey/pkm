import type { Metadata } from "next"
import type React from "react" // Import React
import { FranchiseNav } from "@/components/franchise-nav"
import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"

export const metadata: Metadata = {
  title: "Franchise Dashboard",
  description: "Manage your franchise operations",
}

export default function FranchiseDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </div>
  )
}

