'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-xl h-10 w-10 bg-card/50 dark:bg-card/30 backdrop-blur-sm border-black/5 dark:border-white/10 neumorphic-flat hover:neumorphic-pressed transition-all duration-300"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500 dark:text-yellow-400" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-500 dark:text-blue-400" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glassmorphism bg-card/70 dark:bg-card/60 backdrop-blur-lg border-black/5 dark:border-white/10">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="focus:bg-primary/20 cursor-pointer"
        >
          <Sun className="h-4 w-4 mr-2 text-yellow-500 dark:text-yellow-400" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="focus:bg-primary/20 cursor-pointer"
        >
          <Moon className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="focus:bg-primary/20 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-purple-500 dark:text-purple-400"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line></svg>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}