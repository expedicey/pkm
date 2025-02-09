"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type FranchiseMetrics = {
  id: string
  name: string
  orderFrequency: number
  averageOrderValue: number
  overdueInvoices: number
  revenue: number
}

const franchiseData: FranchiseMetrics[] = [
  { id: "F001", name: "Franchise A", orderFrequency: 8, averageOrderValue: 1200, overdueInvoices: 0, revenue: 120000 },
  { id: "F002", name: "Franchise B", orderFrequency: 5, averageOrderValue: 1500, overdueInvoices: 1, revenue: 90000 },
  { id: "F003", name: "Franchise C", orderFrequency: 6, averageOrderValue: 1300, overdueInvoices: 2, revenue: 100000 },
  { id: "F004", name: "Franchise D", orderFrequency: 7, averageOrderValue: 1100, overdueInvoices: 0, revenue: 110000 },
  { id: "F005", name: "Franchise E", orderFrequency: 4, averageOrderValue: 1600, overdueInvoices: 1, revenue: 80000 },
]

export function FranchiseAnalyticsDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<keyof FranchiseMetrics>("revenue")

  const getTop3Franchises = () => {
    return [...franchiseData].sort((a, b) => b[selectedMetric] - a[selectedMetric]).slice(0, 3)
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Franchise Analytics Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Franchise</TableHead>
                <TableHead>Order Frequency</TableHead>
                <TableHead>Average Order Value</TableHead>
                <TableHead>Payment Punctuality</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {franchiseData.map((franchise) => (
                <TableRow key={franchise.id}>
                  <TableCell>{franchise.name}</TableCell>
                  <TableCell>{franchise.orderFrequency}x/month</TableCell>
                  <TableCell>${franchise.averageOrderValue.toFixed(2)}</TableCell>
                  <TableCell>
                    {franchise.overdueInvoices === 0 ? (
                      <Badge variant="success">On Time</Badge>
                    ) : (
                      <Badge variant="destructive">{franchise.overdueInvoices} Overdue</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div>
            <h3 className="text-lg font-semibold mb-2">Top 3 Franchises Comparison</h3>
            <div className="flex items-center space-x-2 mb-4">
              <span>Compare by:</span>
              <Select
                onValueChange={(value) => setSelectedMetric(value as keyof FranchiseMetrics)}
                defaultValue={selectedMetric}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="orderFrequency">Order Frequency</SelectItem>
                  <SelectItem value="averageOrderValue">Average Order Value</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getTop3Franchises()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={selectedMetric} fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

