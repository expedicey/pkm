"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type AnalyticsData = {
  name: string
  revenue: number
  cost: number
  profit: number
}

const franchiseData: AnalyticsData[] = [
  { name: "Franchise A", revenue: 50000, cost: 30000, profit: 20000 },
  { name: "Franchise B", revenue: 45000, cost: 28000, profit: 17000 },
  { name: "Franchise C", revenue: 55000, cost: 32000, profit: 23000 },
  { name: "Franchise D", revenue: 40000, cost: 25000, profit: 15000 },
]

const itemData: AnalyticsData[] = [
  { name: "Cake", revenue: 30000, cost: 18000, profit: 12000 },
  { name: "Bread", revenue: 25000, cost: 15000, profit: 10000 },
  { name: "Pastry", revenue: 20000, cost: 12000, profit: 8000 },
  { name: "Cookies", revenue: 15000, cost: 9000, profit: 6000 },
]

const regionData: AnalyticsData[] = [
  { name: "North", revenue: 60000, cost: 35000, profit: 25000 },
  { name: "South", revenue: 55000, cost: 33000, profit: 22000 },
  { name: "East", revenue: 50000, cost: 30000, profit: 20000 },
  { name: "West", revenue: 45000, cost: 27000, profit: 18000 },
]

export function RevenueAndCostAnalytics() {
  const [selectedTab, setSelectedTab] = useState("franchise")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  const getDataForTab = () => {
    switch (selectedTab) {
      case "franchise":
        return franchiseData
      case "item":
        return itemData
      case "region":
        return regionData
      default:
        return franchiseData
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Cost Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="franchise" onValueChange={(value) => setSelectedTab(value)}>
          <TabsList>
            <TabsTrigger value="franchise">By Franchise</TabsTrigger>
            <TabsTrigger value="item">By Item</TabsTrigger>
            <TabsTrigger value="region">By Region</TabsTrigger>
          </TabsList>
          <div className="mt-4 mb-4">
            <Select onValueChange={setSelectedMetric} defaultValue={selectedMetric}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="cost">Cost</SelectItem>
                <SelectItem value="profit">Profit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="franchise">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={getDataForTab()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={selectedMetric} fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="item">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={getDataForTab()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={selectedMetric} fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="region">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={getDataForTab()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={selectedMetric} fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

