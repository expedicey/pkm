"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type ProductionTask = {
  id: string
  orderId: string
  itemType: string
  startDate: Date
  endDate: Date
  team: string
}

const productionTasks: ProductionTask[] = [
  {
    id: "TASK001",
    orderId: "ORD001",
    itemType: "Cake",
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 5, 3),
    team: "Team A",
  },
  {
    id: "TASK002",
    orderId: "ORD002",
    itemType: "Bread",
    startDate: new Date(2023, 5, 2),
    endDate: new Date(2023, 5, 4),
    team: "Team B",
  },
  {
    id: "TASK003",
    orderId: "ORD003",
    itemType: "Cake",
    startDate: new Date(2023, 5, 3),
    endDate: new Date(2023, 5, 5),
    team: "Team A",
  },
  {
    id: "TASK004",
    orderId: "ORD004",
    itemType: "Bread",
    startDate: new Date(2023, 5, 4),
    endDate: new Date(2023, 5, 6),
    team: "Team B",
  },
]

export function ProductionSchedule() {
  const [selectedTeam, setSelectedTeam] = useState<string>("All")

  const filteredTasks = productionTasks.filter((task) => selectedTeam === "All" || task.team === selectedTeam)

  const chartData = filteredTasks.map((task) => ({
    id: task.id,
    orderId: task.orderId,
    itemType: task.itemType,
    team: task.team,
    start: task.startDate.getTime(),
    duration: (task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24), // Duration in days
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Production Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Teams</SelectItem>
              <SelectItem value="Team A">Team A</SelectItem>
              <SelectItem value="Team B">Team B</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
              />
              <YAxis type="category" dataKey="orderId" />
              <Tooltip
                labelFormatter={(value) => `Order: ${value}`}
                formatter={(value: any, name: string, props: any) => {
                  if (name === "start") {
                    return [new Date(value).toLocaleDateString(), "Start Date"]
                  }
                  if (name === "duration") {
                    return [`${value} days`, "Duration"]
                  }
                  return [value, name]
                }}
              />
              <Bar dataKey="start" stackId="a" fill="#8884d8" />
              <Bar dataKey="duration" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

