"use client"

import { Home, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

interface BranchHeaderProps {
  branchName: string
}

export function BranchHeader({ branchName }: BranchHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 dark:bg-primary/20 p-2.5 rounded-xl neumorphic-flat">
          <Home className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">{branchName}</h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <div className="flex items-center gap-3 bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-xl px-4 py-2 glassmorphism">
          <div className="bg-primary/10 dark:bg-primary/20 p-1.5 rounded-lg">
            <User className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm font-medium">Branch Manager</span>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => router.push("/")} 
          className="btn-neumorphic flex items-center gap-2 text-white bg-gradient-to-r from-red-500/90 to-red-600/90 dark:from-red-500/80 dark:to-red-600/80 border-none"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

