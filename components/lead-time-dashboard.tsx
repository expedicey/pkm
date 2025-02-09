"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for lead times
const initialLeadTimes = [
  { id: 1, item: "Cakes", leadTime: 3, historicalAverage: 2.5 },
  { id: 2, item: "Bread", leadTime: 1, historicalAverage: 1.2 },
  { id: 3, item: "Pastries", leadTime: 2, historicalAverage: 1.8 },
  { id: 4, item: "Cookies", leadTime: 1, historicalAverage: 1.0 },
  { id: 5, item: "Custom Orders", leadTime: 5, historicalAverage: 4.5 },
]

export function LeadTimeDashboard() {
  const [leadTimes, setLeadTimes] = useState(initialLeadTimes)

  // Simulate updates to lead times
  useEffect(() => {
    const interval = setInterval(() => {
      setLeadTimes((prevLeadTimes) =>
        prevLeadTimes.map((item) => ({
          ...item,
          leadTime: Math.max(1, item.leadTime + (Math.random() > 0.5 ? 0.5 : -0.5)),
          historicalAverage: item.historicalAverage + (Math.random() - 0.5) * 0.1,
        })),
      )
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Time Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Current Lead Time (days)</TableHead>
              <TableHead>Historical Average (days)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leadTimes.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.item}</TableCell>
                <TableCell>{item.leadTime.toFixed(1)}</TableCell>
                <TableCell>{item.historicalAverage.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadTimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="item" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leadTime" fill="#8884d8" name="Current Lead Time" />
              <Bar dataKey="historicalAverage" fill="#82ca9d" name="Historical Average" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

