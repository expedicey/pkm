"use client"

import { useState, useMemo, useCallback } from "react"
import { momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card } from "@/components/ui/card"
import { addDays } from "date-fns"

const localizer = momentLocalizer(moment)

// Sample order data
const initialOrders = [
  {
    id: 1,
    title: "Order #1001",
    start: new Date(2023, 5, 1, 10, 0),
    end: new Date(2023, 5, 1, 11, 0),
    franchise: "Franchise A",
    status: "Pending",
    items: ["Item 1", "Item 2"],
  },
  {
    id: 2,
    title: "Order #1002",
    start: new Date(2023, 5, 3, 14, 0),
    end: new Date(2023, 5, 3, 15, 0),
    franchise: "Franchise B",
    status: "Processing",
    items: ["Item 3", "Item 4", "Item 5"],
  },
  {
    id: 3,
    title: "Order #1003",
    start: new Date(2023, 5, 5, 9, 0),
    end: new Date(2023, 5, 5, 10, 0),
    franchise: "Franchise C",
    status: "Completed",
    items: ["Item 6"],
  },
]

const franchises = ["Franchise A", "Franchise B", "Franchise C"]
const statuses = ["Pending", "Processing", "Completed"]

const statusColors = {
  Pending: "bg-yellow-200",
  Processing: "bg-blue-200",
  Completed: "bg-green-200",
}

export function OrderCalendar() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false)
  const [newOrder, setNewOrder] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    franchise: "",
    status: "Pending",
    items: "",
  })
  const [selectedFranchise, setSelectedFranchise] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [dateRange, setDateRange] = useState({ start: new Date(), end: addDays(new Date(), 7) })

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const franchiseMatch = selectedFranchise === "All" || order.franchise === selectedFranchise
      const statusMatch = selectedStatus === "All" || order.status === selectedStatus
      const dateMatch = order.start >= dateRange.start && order.end <= dateRange.end
      return franchiseMatch && statusMatch && dateMatch
    })
  }, [orders, selectedFranchise, selectedStatus, dateRange])

  const handleSelectEvent = (event) => {
    setSelectedOrder(event)
  }

  const handleCloseDialog = () => {
    setSelectedOrder(null)
  }

  const moveEvent = useCallback(({ event, start, end }) => {
    setOrders((prev) => {
      const existing = prev.find((ev) => ev.id === event.id) ?? {}
      const filtered = prev.filter((ev) => ev.id !== event.id)
      return [...filtered, { ...existing, start, end }]
    })
  }, [])

  const handleNewOrderClick = useCallback(() => {
    setIsNewOrderDialogOpen(true)
  }, [])

  const handleNewOrderSubmit = useCallback(() => {
    const newOrderWithId = {
      ...newOrder,
      id: orders.length + 1,
      items: newOrder.items.split(",").map((item) => item.trim()),
    }
    setOrders((prev) => [...prev, newOrderWithId])
    setIsNewOrderDialogOpen(false)
    setNewOrder({
      title: "",
      start: new Date(),
      end: new Date(),
      franchise: "",
      status: "Pending",
      items: "",
    })
  }, [newOrder, orders])

  const eventPropGetter = useCallback(
    (event) => ({
      className: statusColors[event.status],
    }),
    [],
  )

  return <Card></Card>
}

