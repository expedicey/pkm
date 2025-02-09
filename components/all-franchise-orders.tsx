"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type Order = {
  id: string
  franchise: string
  status: "Pending" | "In Production" | "Ready" | "Delayed"
  itemType: string
  priority: boolean
  quantity: number
}

const orders: Order[] = [
  { id: "ORD001", franchise: "Jakarta", status: "Pending", itemType: "Cake", priority: true, quantity: 5 },
  { id: "ORD002", franchise: "Tangerang", status: "In Production", itemType: "Bread", priority: false, quantity: 10 },
  { id: "ORD003", franchise: "Jakarta", status: "Ready", itemType: "Cake", priority: false, quantity: 3 },
  { id: "ORD004", franchise: "Tangerang", status: "Delayed", itemType: "Bread", priority: true, quantity: 8 },
]

export function AllFranchiseOrders() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [franchiseFilter, setFranchiseFilter] = useState<string>("All")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [itemTypeFilter, setItemTypeFilter] = useState<string>("All")

  const filteredOrders = orders.filter(
    (order) =>
      (franchiseFilter === "All" || order.franchise === franchiseFilter) &&
      (statusFilter === "All" || order.status === statusFilter) &&
      (itemTypeFilter === "All" || order.itemType === itemTypeFilter),
  )

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const handleBulkAction = (action: "approve" | "reject") => {
    // Implement bulk action logic here
    console.log(`${action} orders:`, selectedOrders)
    setSelectedOrders([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Franchise Orders Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select onValueChange={setFranchiseFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Franchise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Franchises</SelectItem>
              <SelectItem value="Jakarta">Jakarta</SelectItem>
              <SelectItem value="Tangerang">Tangerang</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Production">In Production</SelectItem>
              <SelectItem value="Ready">Ready</SelectItem>
              <SelectItem value="Delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setItemTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Item Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Items</SelectItem>
              <SelectItem value="Cake">Cake</SelectItem>
              <SelectItem value="Bread">Bread</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Select</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Item Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => toggleOrderSelection(order.id)}
                  />
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.franchise}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Pending"
                        ? "default"
                        : order.status === "In Production"
                          ? "secondary"
                          : order.status === "Ready"
                            ? "success"
                            : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.itemType}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.priority ? "High" : "Normal"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex space-x-4">
          <Button onClick={() => handleBulkAction("approve")} disabled={selectedOrders.length === 0}>
            Approve Selected
          </Button>
          <Button onClick={() => handleBulkAction("reject")} disabled={selectedOrders.length === 0}>
            Reject Selected
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

