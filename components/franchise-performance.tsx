"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for franchise performance
const performanceData = {
  currentMonth: {
    totalOrders: 450,
    revenue: 45000,
    popularItems: ["Chocolate Cake", "Vanilla Cupcakes", "Strawberry Tart"],
    leastPopularItems: ["Lemon Pie", "Blueberry Muffin", "Carrot Cake"],
  },
  previousMonth: {
    totalOrders: 375,
    revenue: 37500,
  },
}

const monthlyData = [
  { name: "Jan", orders: 300, revenue: 30000 },
  { name: "Feb", orders: 350, revenue: 35000 },
  { name: "Mar", orders: 400, revenue: 40000 },
  { name: "Apr", orders: 375, revenue: 37500 },
  { name: "May", orders: 450, revenue: 45000 },
]

export function FranchisePerformance() {
  const [activeTab, setActiveTab] = useState("summary")

  const orderIncrease =
    ((performanceData.currentMonth.totalOrders - performanceData.previousMonth.totalOrders) /
      performanceData.previousMonth.totalOrders) *
    100
  const revenueIncrease =
    ((performanceData.currentMonth.revenue - performanceData.previousMonth.revenue) /
      performanceData.previousMonth.revenue) *
    100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Franchise Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="summary">Monthly Summary</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{performanceData.currentMonth.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">
                    {orderIncrease >= 0 ? "+" : ""}
                    {orderIncrease.toFixed(1)}% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${performanceData.currentMonth.revenue}</div>
                  <p className="text-xs text-muted-foreground">
                    {revenueIncrease >= 0 ? "+" : ""}
                    {revenueIncrease.toFixed(1)}% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Most Popular Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm">
                    {performanceData.currentMonth.popularItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Least Popular Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm">
                    {performanceData.currentMonth.leastPopularItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="trends">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="orders" fill="#8884d8" name="Orders" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

