"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

type Supplier = {
  id: string
  name: string
  deliveryTime: number
  defectRate: number
  issues: string[]
}

const initialSuppliers: Supplier[] = [
  { id: "SUP001", name: "Flour Co.", deliveryTime: 2, defectRate: 0.5, issues: [] },
  { id: "SUP002", name: "Sugar Inc.", deliveryTime: 3, defectRate: 1.2, issues: ["Delayed shipment by 2 days"] },
  { id: "SUP003", name: "Egg Farms", deliveryTime: 1, defectRate: 0.8, issues: [] },
]

export function SupplierDashboard() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [newIssue, setNewIssue] = useState("")
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)

  const handleAddIssue = () => {
    if (selectedSupplier && newIssue) {
      setSuppliers((prev) =>
        prev.map((supplier) =>
          supplier.id === selectedSupplier.id ? { ...supplier, issues: [...supplier.issues, newIssue] } : supplier,
        ),
      )
      setNewIssue("")
      setSelectedSupplier(null)
      toast({
        title: "Issue Logged",
        description: `New issue logged for ${selectedSupplier.name}`,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplier Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead>
              <TableHead>Avg. Delivery Time (days)</TableHead>
              <TableHead>Defect Rate (%)</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.deliveryTime}</TableCell>
                <TableCell>{supplier.defectRate.toFixed(1)}%</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      supplier.defectRate < 1 && supplier.deliveryTime <= 2
                        ? "success"
                        : supplier.defectRate < 2 && supplier.deliveryTime <= 3
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {supplier.defectRate < 1 && supplier.deliveryTime <= 2
                      ? "Excellent"
                      : supplier.defectRate < 2 && supplier.deliveryTime <= 3
                        ? "Good"
                        : "Needs Improvement"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setSelectedSupplier(supplier)}>
                        Log Issue
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Log Issue for {selectedSupplier?.name}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="issue" className="text-right">
                            Issue
                          </Label>
                          <Input
                            id="issue"
                            value={newIssue}
                            onChange={(e) => setNewIssue(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <Button onClick={handleAddIssue}>Add Issue</Button>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Recent Issues</h3>
          {suppliers.map((supplier) =>
            supplier.issues.map((issue, index) => (
              <div key={`${supplier.id}-${index}`} className="mb-2">
                <strong>{supplier.name}:</strong> {issue}
              </div>
            )),
          )}
        </div>
      </CardContent>
    </Card>
  )
}

