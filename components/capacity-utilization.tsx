"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

const capacityData = [
  { name: "Line 1", thisWeek: 80, nextWeek: 90 },
  { name: "Line 2", thisWeek: 65, nextWeek: 100 },
  { name: "Line 3", thisWeek: 75, nextWeek: 85 },
]

export function CapacityUtilization() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Capacity Utilization</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={capacityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="thisWeek" name="This Week" fill="#8884d8" />
            <Bar dataKey="nextWeek" name="Next Week" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-4">
          <Alert>
            <AlertTitle>Current Utilization</AlertTitle>
            <AlertDescription>Line 1 is at 80% capacity this week.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Predicted Bottleneck</AlertTitle>
            <AlertDescription>
              Line 2 will hit 100% capacity next Monday. Consider redistributing workload or increasing capacity.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  )
}

