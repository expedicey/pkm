"use client"

import { Building, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

interface HubHeaderProps {
  hubName: string
}

export function HubHeader({ hubName }: HubHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="flex items-center gap-2">
        <Building className="h-6 w-6" />
        <h1 className="text-2xl font-bold">{hubName}</h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <span>Hub Administrator</span>
        </div>

        <Button variant="outline" size="sm" onClick={() => router.push("/")} className="flex items-center gap-1">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

