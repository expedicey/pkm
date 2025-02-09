"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell } from "lucide-react"

// Mock data for orders
const initialOrders = [
  { id: "ORD001", items: ["Burger", "Fries"], status: "Pending", estimatedCompletion: "2023-06-10" },
  { id: "ORD002", items: ["Pizza", "Soda"], status: "In Production", estimatedCompletion: "2023-06-09" },
  { id: "ORD003", items: ["Salad"], status: "Ready for Pickup", estimatedCompletion: "2023-06-08" },
]

// Mock function to simulate real-time updates
function simulateRealTimeUpdates(orders, setOrders) {
  const statuses = ["Pending", "In Production", "Ready for Pickup", "Delivered"]
  const interval = setInterval(() => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => ({
        ...order,
        status: statuses[(statuses.indexOf(order.status) + 1) % statuses.length],
      })),
    )
  }, 5000) // Update every 5 seconds

  return () => clearInterval(interval)
}

export function OrderStatusTracking() {
  const [orders, setOrders] = useState(initialOrders)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const cleanup = simulateRealTimeUpdates(orders, setOrders)
    return cleanup
  }, [orders]) // Added orders to the dependency array

  // Simulate a delay notification
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotifications([{ id: 1, message: "Item Burger delayed by 2 days due to supplier issues in ORD001" }])
    }, 10000) // Show notification after 10 seconds

    return () => clearTimeout(timeout)
  }, [])

  const clearNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.map((notification) => (
          <Alert key={notification.id} className="mb-4">
            <Bell className="h-4 w-4" />
            <AlertTitle>Notification</AlertTitle>
            <AlertDescription>{notification.message}</AlertDescription>
            <Button variant="outline" size="sm" onClick={() => clearNotification(notification.id)} className="mt-2">
              Dismiss
            </Button>
          </Alert>
        ))}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Estimated Completion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.items.join(", ")}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Pending"
                        ? "default"
                        : order.status === "In Production"
                          ? "secondary"
                          : order.status === "Ready for Pickup"
                            ? "success"
                            : "primary"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.estimatedCompletion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

