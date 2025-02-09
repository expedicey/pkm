"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type WasteRecord = {
  id: string
  item: string
  quantity: number
  reason: string
  date: string
}

const initialWasteRecords: WasteRecord[] = [
  { id: "W001", item: "Bread", quantity: 10, reason: "Expired", date: "2023-06-01" },
  { id: "W002", item: "Cake", quantity: 5, reason: "Damaged", date: "2023-06-02" },
  { id: "W003", item: "Cookies", quantity: 20, reason: "Overproduction", date: "2023-06-03" },
]

export function WasteTracking() {
  const [wasteRecords, setWasteRecords] = useState<WasteRecord[]>(initialWasteRecords)
  const [newItem, setNewItem] = useState("")
  const [newQuantity, setNewQuantity] = useState("")
  const [newReason, setNewReason] = useState("")

  const addWasteRecord = () => {
    if (newItem && newQuantity && newReason) {
      const newRecord: WasteRecord = {
        id: `W${wasteRecords.length + 1}`.padStart(4, "0"),
        item: newItem,
        quantity: Number.parseInt(newQuantity),
        reason: newReason,
        date: new Date().toISOString().split("T")[0],
      }
      setWasteRecords([...wasteRecords, newRecord])
      setNewItem("")
      setNewQuantity("")
      setNewReason("")
      toast({
        title: "Waste Record Added",
        description: `New waste record added for ${newItem}`,
      })
    }
  }

  const wasteByItem = wasteRecords.reduce(
    (acc, record) => {
      acc[record.item] = (acc[record.item] || 0) + record.quantity
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(wasteByItem).map(([item, quantity]) => ({ item, quantity }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waste Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input placeholder="Item" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
            <Input
              type="number"
              placeholder="Quantity"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
            />
            <Select value={newReason} onValueChange={setNewReason}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Damaged">Damaged</SelectItem>
                <SelectItem value="Overproduction">Overproduction</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addWasteRecord}>Add Record</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wasteRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.item}</TableCell>
                  <TableCell>{record.quantity}</TableCell>
                  <TableCell>{record.reason}</TableCell>
                  <TableCell>{record.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="item" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Waste Reduction Recommendations</h3>
            <ul className="list-disc pl-5">
              <li>Adjust bread production by 20% on Sundays to reduce overproduction.</li>
              <li>Implement a first-in-first-out (FIFO) system for perishable items to minimize expiration.</li>
              <li>Review packaging processes to reduce damage during transportation and storage.</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

