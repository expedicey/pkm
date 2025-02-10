"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type React from "react"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Overview
      </Link>
      <Link
        href="/dashboard/inventory"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/inventory" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Inventory
      </Link>
      <Link
        href="/dashboard/order-management"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/order-management" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Order Management
      </Link>
      <Link
        href="/dashboard/franchises"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/franchises" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Franchises
      </Link>
      <Link
        href="/dashboard/finance"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/finance" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Finance
      </Link>
      <Link
        href="/dashboard/franchise-performance"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard/franchise-performance" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Performance
      </Link>
    </nav>
  )
}

