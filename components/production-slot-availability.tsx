"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

// Mock data for production slots
const productionSlots = {
  "2023-06-01": { status: "busy", workload: 90 },
  "2023-06-02": { status: "free", workload: 20 },
  "2023-06-03": { status: "busy", workload: 80 },
  "2023-06-04": { status: "free", workload: 10 },
  "2023-06-05": { status: "busy", workload: 100 },
}

const getRecommendedDate = (slots) => {
  const sortedDates = Object.entries(slots)
    .filter(([_, slot]) => slot.status === "free")
    .sort(([, a], [, b]) => a.workload - b.workload)

  return sortedDates.length > 0 ? sortedDates[0][0] : null
}

export function ProductionSlotAvailability() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const recommendedDate = getRecommendedDate(productionSlots)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Production Slot Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              busy: (date) => productionSlots[date.toISOString().split("T")[0]]?.status === "busy",
              free: (date) => productionSlots[date.toISOString().split("T")[0]]?.status === "free",
            }}
            modifiersStyles={{
              busy: { color: "white", backgroundColor: "#EF4444" },
              free: { color: "white", backgroundColor: "#10B981" },
            }}
          />
          <div>
            <h3 className="text-lg font-semibold mb-2">Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Badge variant="destructive" className="mr-2">
                  Busy
                </Badge>
                <span>High workload, not recommended for new orders</span>
              </div>
              <div className="flex items-center">
                <Badge variant="success" className="mr-2">
                  Free
                </Badge>
                <span>Low workload, good for new orders</span>
              </div>
            </div>
            {recommendedDate && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Recommended Order Date</h3>
                <Badge variant="outline" className="text-lg">
                  {new Date(recommendedDate).toLocaleDateString()}
                </Badge>
              </div>
            )}
          </div>
        </div>
        {selectedDate && productionSlots[selectedDate.toISOString().split("T")[0]] && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Selected Date Details</h3>
            <p>Status: {productionSlots[selectedDate.toISOString().split("T")[0]].status}</p>
            <p>Workload: {productionSlots[selectedDate.toISOString().split("T")[0]].workload}%</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

