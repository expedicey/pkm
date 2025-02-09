"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// Mock data for available statements
const availableStatements = [
  { id: 1, month: "January 2023" },
  { id: 2, month: "February 2023" },
  { id: 3, month: "March 2023" },
  { id: 4, month: "April 2023" },
  { id: 5, month: "May 2023" },
]

export function ReceiptsStatements() {
  const [selectedMonth, setSelectedMonth] = useState("")

  const handleDownload = () => {
    // Here you would typically generate and download the statement
    alert(`Downloading statement for ${selectedMonth}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receipts & Statements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Select onValueChange={setSelectedMonth} value={selectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {availableStatements.map((statement) => (
                <SelectItem key={statement.id} value={statement.month}>
                  {statement.month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleDownload} disabled={!selectedMonth}>
            Download Statement
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

