"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for production insights
const leadTimeData = [
  { item: "Chocolate Cake", averageLeadTime: 2.5 },
  { item: "Vanilla Cupcakes", averageLeadTime: 1.8 },
  { item: "Strawberry Tart", averageLeadTime: 3.2 },
  { item: "Lemon Pie", averageLeadTime: 2.7 },
  { item: "Blueberry Muffin", averageLeadTime: 1.5 },
]

const peakTimesData = [
  { hour: "6AM", orders: 10 },
  { hour: "8AM", orders: 25 },
  { hour: "10AM", orders: 45 },
  { hour: "12PM", orders: 60 },
  { hour: "2PM", orders: 55 },
  { hour: "4PM", orders: 40 },
  { hour: "6PM", orders: 30 },
  { hour: "8PM", orders: 15 },
]

export function ProductionInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Production Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Average Lead Times for Frequently Ordered Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Average Lead Time (days)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadTimeData.map((item) => (
                  <TableRow key={item.item}>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>{item.averageLeadTime.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Peak Order Times at Central Hub</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={peakTimesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Tip: Consider placing orders during non-peak hours to avoid potential delays.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

