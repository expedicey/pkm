"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

type InventoryItem = {
  id: string
  name: string
  category: "Raw Material" | "Finished Good"
  currentStock: number
  unit: string
  reorderPoint: number
}

const initialInventory: InventoryItem[] = [
  { id: "INV001", name: "Flour", category: "Raw Material", currentStock: 50, unit: "kg", reorderPoint: 100 },
  { id: "INV002", name: "Sugar", category: "Raw Material", currentStock: 30, unit: "kg", reorderPoint: 50 },
  {
    id: "INV003",
    name: "Chocolate Cake",
    category: "Finished Good",
    currentStock: 15,
    unit: "pieces",
    reorderPoint: 10,
  },
  { id: "INV004", name: "Bread", category: "Finished Good", currentStock: 40, unit: "loaves", reorderPoint: 30 },
]

export function RealTimeInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setInventory((prev) =>
        prev.map((item) => ({
          ...item,
          currentStock: Math.max(0, item.currentStock + Math.floor(Math.random() * 5) - 2),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleReorder = (itemId: string) => {
    // Simulate reordering process
    toast({
      title: "Reorder Initiated",
      description: `Reorder process started for item ${itemId}`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Inventory Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  {item.currentStock} {item.unit}
                </TableCell>
                <TableCell>
                  {item.currentStock <= item.reorderPoint ? (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Low Stock
                    </Badge>
                  ) : (
                    <Badge variant="secondary">In Stock</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {item.currentStock <= item.reorderPoint && (
                    <Button onClick={() => handleReorder(item.id)}>Reorder</Button>
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

