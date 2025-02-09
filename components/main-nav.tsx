"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type React from "react"
import { OverviewSubNav } from "@/components/overview-sub-nav"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <div className="relative group">
        <Link
          href="/dashboard"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname.startsWith("/dashboard") &&
              !pathname.startsWith("/dashboard/inventory") &&
              !pathname.startsWith("/dashboard/orders") &&
              !pathname.startsWith("/dashboard/order-management") &&
              !pathname.startsWith("/dashboard/franchises") &&
              !pathname.startsWith("/dashboard/finance") &&
              !pathname.startsWith("/dashboard/franchise-performance")
              ? "text-primary"
              : "text-muted-foreground",
          )}
        >
          Overview
        </Link>
        <div className="absolute left-0 mt-2 w-48 bg-background rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <OverviewSubNav className="flex-col items-start p-2" />
        </div>
      </div>
      <Link
        href="/dashboard/inventory"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/inventory" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Inventory
      </Link>
      <Link
        href="/dashboard/orders"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/orders" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Orders
      </Link>
      <Link
        href="/dashboard/order-management"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/order-management" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Order Management
      </Link>
      <Link
        href="/dashboard/franchises"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/franchises" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Franchises
      </Link>
      <Link
        href="/dashboard/finance"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/finance" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Finance
      </Link>
      <Link
        href="/dashboard/franchise-performance"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/franchise-performance" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Performance
      </Link>
    </nav>
  )
}

