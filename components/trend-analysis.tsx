"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const seasonalDemandData = [
  { month: "Jan", cakes: 100, bread: 150, pastries: 80 },
  { month: "Feb", cakes: 120, bread: 140, pastries: 90 },
  { month: "Mar", cakes: 140, bread: 160, pastries: 100 },
  { month: "Apr", cakes: 160, bread: 180, pastries: 110 },
  { month: "May", cakes: 180, bread: 170, pastries: 120 },
  { month: "Jun", cakes: 200, bread: 160, pastries: 130 },
  { month: "Jul", cakes: 220, bread: 150, pastries: 140 },
  { month: "Aug", cakes: 240, bread: 140, pastries: 150 },
  { month: "Sep", cakes: 260, bread: 130, pastries: 160 },
  { month: "Oct", cakes: 280, bread: 120, pastries: 170 },
  { month: "Nov", cakes: 300, bread: 110, pastries: 180 },
  { month: "Dec", cakes: 340, bread: 100, pastries: 200 },
]

const itemPopularityData = [
  { quarter: "Q1 2023", cakes: 100, bread: 100, pastries: 100 },
  { quarter: "Q2 2023", cakes: 110, bread: 95, pastries: 105 },
  { quarter: "Q3 2023", cakes: 120, bread: 90, pastries: 110 },
  { quarter: "Q4 2023", cakes: 130, bread: 85, pastries: 115 },
]

export function TrendAnalysis() {
  const [selectedItem, setSelectedItem] = useState("cakes")

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Trend Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="seasonal">
          <TabsList>
            <TabsTrigger value="seasonal">Seasonal Demand</TabsTrigger>
            <TabsTrigger value="popularity">Item Popularity</TabsTrigger>
          </TabsList>
          <TabsContent value="seasonal">
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Seasonal Demand Patterns</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={seasonalDemandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cakes" stroke="#8884d8" />
                  <Line type="monotone" dataKey="bread" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="pastries" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
              <p className="mt-2 text-sm text-muted-foreground">
                Cake orders spike 40% in December compared to the yearly average.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="popularity">
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Item Popularity Trends</h3>
              <div className="flex items-center space-x-2 mb-4">
                <span>Select item:</span>
                <Select onValueChange={setSelectedItem} defaultValue={selectedItem}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cakes">Cakes</SelectItem>
                    <SelectItem value="bread">Bread</SelectItem>
                    <SelectItem value="pastries">Pastries</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={itemPopularityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey={selectedItem} stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
              <p className="mt-2 text-sm text-muted-foreground">
                Bread sales are down 15% this quarter compared to Q1 2023.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

