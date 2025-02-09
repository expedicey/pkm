"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"

const historicalData = [
  { month: "Jan", cakes: 1000, bread: 1500, pastries: 800 },
  { month: "Feb", cakes: 1200, bread: 1400, pastries: 900 },
  { month: "Mar", cakes: 1100, bread: 1600, pastries: 850 },
  { month: "Apr", cakes: 1300, bread: 1550, pastries: 950 },
  { month: "May", cakes: 1400, bread: 1500, pastries: 1000 },
  { month: "Jun", cakes: 1600, bread: 1450, pastries: 1100 },
]

export function ForecastingTools() {
  const [selectedProduct, setSelectedProduct] = useState("cakes")
  const [increasePercentage, setIncreasePercentage] = useState(30)

  const forecastData = historicalData.map((month) => ({
    ...month,
    [selectedProduct]: month[selectedProduct as keyof typeof month] * (1 + increasePercentage / 100),
  }))

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Forecasting Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Select onValueChange={setSelectedProduct} defaultValue={selectedProduct}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cakes">Cakes</SelectItem>
              <SelectItem value="bread">Bread</SelectItem>
              <SelectItem value="pastries">Pastries</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={selectedProduct} stroke="#8884d8" name="Historical" />
            <Line type="monotone" dataKey={selectedProduct} stroke="#82ca9d" name="Forecast" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adjust production for holiday season (%)
          </label>
          <Slider defaultValue={[30]} max={100} step={1} onValueChange={(value) => setIncreasePercentage(value[0])} />
          <span className="block mt-2 text-sm text-gray-500">Current increase: {increasePercentage}%</span>
        </div>
        <Alert className="mt-4">
          <AlertTitle>Production Adjustment Recommendation</AlertTitle>
          <AlertDescription>
            Increase {selectedProduct} production by {increasePercentage}% for the upcoming holiday season based on
            historical data and current trends.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

