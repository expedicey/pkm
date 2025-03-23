"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function LoginForm() {
  const router = useRouter()
  const [userType, setUserType] = useState<"branch" | "hub">("branch")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would validate credentials here
    // For now, we'll just redirect based on user type
    if (userType === "branch") {
      router.push("/branch-dashboard")
    } else {
      router.push("/hub-dashboard")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium opacity-80">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bg-card/30 dark:bg-card/30 backdrop-blur-sm border-black/10 dark:border-white/10 rounded-xl h-12 px-4 neumorphic-flat focus:neumorphic-pressed"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium opacity-80">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-card/30 dark:bg-card/30 backdrop-blur-sm border-black/10 dark:border-white/10 rounded-xl h-12 px-4 neumorphic-flat focus:neumorphic-pressed"
          />
        </div>
        
        <div className="p-4 glassmorphism rounded-xl mt-4">
          <RadioGroup
            value={userType}
            onValueChange={(value) => setUserType(value as "branch" | "hub")}
            className="flex justify-center space-x-8"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="branch" id="branch" className="border-primary" />
              <Label htmlFor="branch" className="cursor-pointer">Franchise Branch</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hub" id="hub" className="border-primary" />
              <Label htmlFor="hub" className="cursor-pointer">Central Hub</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-12 rounded-xl font-medium text-white btn-neumorphic"
      >
        Login
      </Button>
    </form>
  )
}

