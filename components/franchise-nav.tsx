"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type React from "react"

export function FranchiseNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/franchise-dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/franchise-dashboard" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Overview
      </Link>
      <Link
        href="/franchise-dashboard/inventory-lead-time"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/franchise-dashboard/inventory-lead-time" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Inventory & Lead Time
      </Link>
      <Link
        href="/franchise-dashboard/order-management"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/franchise-dashboard/order-management" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Order Management
      </Link>
      <Link
        href="/franchise-dashboard/production-calendar"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/franchise-dashboard/production-calendar" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Production Calendar
      </Link>
      <Link
        href="/franchise-dashboard/payment-tracking"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/franchise-dashboard/payment-tracking" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Payment Tracking
      </Link>
      <Link
        href="/franchise-dashboard/analytics-reports"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/franchise-dashboard/analytics-reports" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Analytics & Reports
      </Link>
    </nav>
  )
}

