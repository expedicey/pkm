"use client"

import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const localizer = momentLocalizer(moment)

// Mock data for orders
const orders = [
  {
    id: 1,
    title: "Order #1001",
    start: new Date(2023, 5, 1),
    end: new Date(2023, 5, 2),
    franchise: "Franchise A",
    status: "completed",
    items: [{ name: "Cake", quantity: 2 }],
    productionTeam: "Team Alpha",
  },
  {
    id: 2,
    title: "Order #1002",
    start: new Date(2023, 5, 3),
    end: new Date(2023, 5, 4),
    franchise: "Franchise B",
    status: "in progress",
    items: [{ name: "Cupcakes", quantity: 50 }],
    productionTeam: "Team Beta",
  },
  {
    id: 3,
    title: "Order #1003",
    start: new Date(2023, 5, 5),
    end: new Date(2023, 5, 6),
    franchise: "Franchise C",
    status: "delayed",
    items: [{ name: "Cookies", quantity: 100 }],
    productionTeam: "Team Gamma",
  },
]

const franchises = ["All Franchises", "Franchise A", "Franchise B", "Franchise C"]
const itemTypes = ["All Items", "Cake", "Cupcakes", "Cookies"]

export function VisualSharedCalendar() {
  const [selectedFranchise, setSelectedFranchise] = useState("All Franchises")
  const [selectedItemType, setSelectedItemType] = useState("All Items")
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filteredOrders = orders.filter(
    (order) =>
      (selectedFranchise === "All Franchises" || order.franchise === selectedFranchise) &&
      (selectedItemType === "All Items" || order.items.some((item) => item.name === selectedItemType)),
  )

  const eventStyleGetter = (event) => {
    let backgroundColor = ""
    switch (event.status) {
      case "completed":
        backgroundColor = "#10B981" // green
        break
      case "in progress":
        backgroundColor = "#F59E0B" // orange
        break
      case "delayed":
        backgroundColor = "#EF4444" // red
        break
      default:
        backgroundColor = "#3B82F6" // blue
    }
    return { style: { backgroundColor } }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visual Shared Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select value={selectedFranchise} onValueChange={setSelectedFranchise}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Franchise" />
            </SelectTrigger>
            <SelectContent>
              {franchises.map((franchise) => (
                <SelectItem key={franchise} value={franchise}>
                  {franchise}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedItemType} onValueChange={setSelectedItemType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Item Type" />
            </SelectTrigger>
            <SelectContent>
              {itemTypes.map((itemType) => (
                <SelectItem key={itemType} value={itemType}>
                  {itemType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          localizer={localizer}
          events={filteredOrders}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => setSelectedOrder(event)}
        />
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedOrder?.title}</DialogTitle>
            </DialogHeader>
            <div>
              <p>
                <strong>Franchise:</strong> {selectedOrder?.franchise}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder?.status}
              </p>
              <p>
                <strong>Items:</strong>
              </p>
              <ul>
                {selectedOrder?.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Production Team:</strong> {selectedOrder?.productionTeam}
              </p>
            </div>
            <Button onClick={() => setSelectedOrder(null)}>Close</Button>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

