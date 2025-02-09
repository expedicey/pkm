"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

type LeadTime = {
  itemType: string
  leadTime: number
}

const initialLeadTimes: LeadTime[] = [
  { itemType: "Cake", leadTime: 3 },
  { itemType: "Bread", leadTime: 1 },
  { itemType: "Pastry", leadTime: 2 },
]

export function LeadTimeManagement() {
  const [leadTimes, setLeadTimes] = useState<LeadTime[]>(initialLeadTimes)
  const [newItemType, setNewItemType] = useState("")
  const [newLeadTime, setNewLeadTime] = useState("")

  const updateLeadTime = (itemType: string, newLeadTime: number) => {
    setLeadTimes((prev) => prev.map((item) => (item.itemType === itemType ? { ...item, leadTime: newLeadTime } : item)))
    toast({
      title: "Lead Time Updated",
      description: `${itemType} lead time updated to ${newLeadTime} days.`,
    })
  }

  const addNewLeadTime = () => {
    if (newItemType && newLeadTime) {
      setLeadTimes((prev) => [...prev, { itemType: newItemType, leadTime: Number.parseInt(newLeadTime) }])
      setNewItemType("")
      setNewLeadTime("")
      toast({
        title: "New Lead Time Added",
        description: `${newItemType} added with a lead time of ${newLeadTime} days.`,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Time Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Type</TableHead>
              <TableHead>Lead Time (days)</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leadTimes.map((item) => (
              <TableRow key={item.itemType}>
                <TableCell>{item.itemType}</TableCell>
                <TableCell>{item.leadTime}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="New lead time"
                    className="w-24 mr-2"
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value)
                      if (!isNaN(value) && value > 0) {
                        updateLeadTime(item.itemType, value)
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex space-x-2">
          <Input placeholder="New item type" value={newItemType} onChange={(e) => setNewItemType(e.target.value)} />
          <Input
            type="number"
            placeholder="Lead time (days)"
            value={newLeadTime}
            onChange={(e) => setNewLeadTime(e.target.value)}
          />
          <Button onClick={addNewLeadTime}>Add New Item</Button>
        </div>
      </CardContent>
    </Card>
  )
}

