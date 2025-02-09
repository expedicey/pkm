"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

type DelayedOrder = {
  id: string
  franchise: string
  itemType: string
  reason: string
  notified: boolean
}

const initialDelayedOrders: DelayedOrder[] = [
  { id: "ORD004", franchise: "Tangerang", itemType: "Bread", reason: "Equipment downtime", notified: false },
  { id: "ORD007", franchise: "Jakarta", itemType: "Cake", reason: "Supplier shortage", notified: true },
]

export function ExceptionHandling() {
  const [delayedOrders, setDelayedOrders] = useState<DelayedOrder[]>(initialDelayedOrders)
  const [newOrderId, setNewOrderId] = useState("")
  const [newReason, setNewReason] = useState("")

  const notifyFranchise = (orderId: string) => {
    setDelayedOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, notified: true } : order)))
    toast({
      title: "Franchise Notified",
      description: `Franchise has been notified about the delay in order ${orderId}.`,
    })
  }

  const addDelayedOrder = () => {
    if (newOrderId && newReason) {
      const newOrder: DelayedOrder = {
        id: newOrderId,
        franchise: "Unknown", // You might want to fetch this information based on the order ID
        itemType: "Unknown", // You might want to fetch this information based on the order ID
        reason: newReason,
        notified: false,
      }
      setDelayedOrders((prev) => [...prev, newOrder])
      setNewOrderId("")
      setNewReason("")
      toast({
        title: "Delayed Order Added",
        description: `Order ${newOrderId} has been marked as delayed.`,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exception Handling</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead>Item Type</TableHead>
              <TableHead>Reason for Delay</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {delayedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.franchise}</TableCell>
                <TableCell>{order.itemType}</TableCell>
                <TableCell>{order.reason}</TableCell>
                <TableCell>
                  <Badge variant={order.notified ? "success" : "destructive"}>
                    {order.notified ? "Notified" : "Not Notified"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button onClick={() => notifyFranchise(order.id)} disabled={order.notified}>
                    Notify Franchise
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex space-x-2">
          <Input placeholder="Order ID" value={newOrderId} onChange={(e) => setNewOrderId(e.target.value)} />
          <Select onValueChange={setNewReason}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Reason for delay" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Supplier shortage">Supplier shortage</SelectItem>
              <SelectItem value="Equipment downtime">Equipment downtime</SelectItem>
              <SelectItem value="Staff shortage">Staff shortage</SelectItem>
              <SelectItem value="Unexpected demand">Unexpected demand</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addDelayedOrder}>Add Delayed Order</Button>
        </div>
      </CardContent>
    </Card>
  )
}

