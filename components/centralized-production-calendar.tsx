"use client"

import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const localizer = momentLocalizer(moment)

type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  franchise: string
  itemType: string
  productionLine: string
}

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Cake Order - Franchise A",
    start: new Date(2023, 5, 1, 10, 0),
    end: new Date(2023, 5, 1, 12, 0),
    franchise: "Franchise A",
    itemType: "Cake",
    productionLine: "Line 1",
  },
  {
    id: "2",
    title: "Bread Order - Franchise B",
    start: new Date(2023, 5, 2, 14, 0),
    end: new Date(2023, 5, 2, 16, 0),
    franchise: "Franchise B",
    itemType: "Bread",
    productionLine: "Line 2",
  },
  {
    id: "3",
    title: "Pastry Order - Franchise C",
    start: new Date(2023, 5, 3, 9, 0),
    end: new Date(2023, 5, 3, 11, 0),
    franchise: "Franchise C",
    itemType: "Pastry",
    productionLine: "Line 3",
  },
]

export function CentralizedProductionCalendar() {
  const [view, setView] = useState("month")
  const [colorBy, setColorBy] = useState("franchise")

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = ""
    switch (colorBy) {
      case "franchise":
        backgroundColor =
          event.franchise === "Franchise A" ? "#FF6B6B" : event.franchise === "Franchise B" ? "#4ECDC4" : "#45B7D1"
        break
      case "itemType":
        backgroundColor = event.itemType === "Cake" ? "#FF6B6B" : event.itemType === "Bread" ? "#4ECDC4" : "#45B7D1"
        break
      case "productionLine":
        backgroundColor =
          event.productionLine === "Line 1" ? "#FF6B6B" : event.productionLine === "Line 2" ? "#4ECDC4" : "#45B7D1"
        break
    }
    return {
      style: { backgroundColor },
    }
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Centralized Production Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <Button onClick={() => setView("month")} variant={view === "month" ? "default" : "outline"}>
              Month
            </Button>
            <Button onClick={() => setView("week")} variant={view === "week" ? "default" : "outline"}>
              Week
            </Button>
            <Button onClick={() => setView("day")} variant={view === "day" ? "default" : "outline"}>
              Day
            </Button>
          </div>
          <Select onValueChange={setColorBy} defaultValue={colorBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Color by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="franchise">Franchise</SelectItem>
              <SelectItem value="itemType">Item Type</SelectItem>
              <SelectItem value="productionLine">Production Line</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div style={{ height: "500px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view as "month" | "week" | "day"}
            onView={(newView) => setView(newView)}
            eventPropGetter={eventStyleGetter}
            tooltipAccessor={(event) => `${event.title}\nProduction Line: ${event.productionLine}`}
          />
        </div>
      </CardContent>
    </Card>
  )
}

