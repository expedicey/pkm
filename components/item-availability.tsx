"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"

// Mock data for inventory items
const initialInventory = [
  { id: 1, name: "Cake Mix", stock: 50, lowStockThreshold: 20 },
  { id: 2, name: "Frosting", stock: 30, lowStockThreshold: 15 },
  { id: 3, name: "Sprinkles", stock: 100, lowStockThreshold: 40 },
  { id: 4, name: "Cake Boxes", stock: 75, lowStockThreshold: 30 },
  { id: 5, name: "Candles", stock: 200, lowStockThreshold: 50 },
]

export function ItemAvailability() {
  const [inventory, setInventory] = useState(initialInventory)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setInventory((prevInventory) =>
        prevInventory.map((item) => ({
          ...item,
          stock: Math.max(0, item.stock + Math.floor(Math.random() * 5) - 2),
        })),
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Item Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.stock} units</TableCell>
                <TableCell>
                  {item.stock <= item.lowStockThreshold ? (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Low Stock
                    </Badge>
                  ) : (
                    <Badge variant="secondary">In Stock</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

