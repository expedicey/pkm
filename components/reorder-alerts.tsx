"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell } from "lucide-react"

// Mock data for inventory items
const inventoryItems = [
  { id: 1, name: "Cake Mix", stock: 50, reorderPoint: 30, leadTime: 3, dailyUsage: 5 },
  { id: 2, name: "Frosting", stock: 30, reorderPoint: 20, leadTime: 2, dailyUsage: 4 },
  { id: 3, name: "Sprinkles", stock: 100, reorderPoint: 50, leadTime: 4, dailyUsage: 10 },
  { id: 4, name: "Cake Boxes", stock: 75, reorderPoint: 40, leadTime: 5, dailyUsage: 8 },
  { id: 5, name: "Candles", stock: 200, reorderPoint: 100, leadTime: 7, dailyUsage: 20 },
]

export function ReorderAlerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    // Generate alerts based on inventory levels and usage patterns
    const newAlerts = inventoryItems
      .filter((item) => item.stock <= item.reorderPoint)
      .map((item) => {
        const daysUntilStockout = Math.floor(item.stock / item.dailyUsage)
        const reorderBy = new Date()
        reorderBy.setDate(reorderBy.getDate() + daysUntilStockout - item.leadTime)

        return {
          id: item.id,
          message: `Reorder ${item.name} by ${reorderBy.toLocaleDateString()} to meet demand.`,
          critical: daysUntilStockout <= item.leadTime,
        }
      })

    setAlerts(newAlerts)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reorder Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <p>No reorder alerts at this time.</p>
        ) : (
          alerts.map((alert) => (
            <Alert key={alert.id} variant={alert.critical ? "destructive" : "default"} className="mb-4">
              <Bell className="h-4 w-4" />
              <AlertTitle>{alert.critical ? "Critical Alert" : "Reorder Alert"}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  )
}

