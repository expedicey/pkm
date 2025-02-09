import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Central Hub Dashboard</CardTitle>
            <CardDescription>Manage all franchises and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard">Enter Central Hub</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Franchise Dashboard</CardTitle>
            <CardDescription>Manage your specific franchise</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/franchise-dashboard">Enter Franchise Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

