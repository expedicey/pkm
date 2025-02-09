"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

type Invoice = {
  id: string
  franchiseId: string
  franchiseName: string
  amount: number
  date: string
  status: "Draft" | "Sent" | "Paid"
}

const initialInvoices: Invoice[] = [
  { id: "INV001", franchiseId: "F001", franchiseName: "Franchise A", amount: 5000, date: "2023-06-01", status: "Sent" },
  {
    id: "INV002",
    franchiseId: "F002",
    franchiseName: "Franchise B",
    amount: 4500,
    date: "2023-06-02",
    status: "Draft",
  },
  { id: "INV003", franchiseId: "F003", franchiseName: "Franchise C", amount: 5500, date: "2023-06-03", status: "Paid" },
]

export function InvoiceGeneration() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({})

  const handleGenerateInvoice = () => {
    if (newInvoice.franchiseId && newInvoice.amount) {
      const invoice: Invoice = {
        id: `INV${invoices.length + 1}`.padStart(6, "0"),
        franchiseId: newInvoice.franchiseId,
        franchiseName: `Franchise ${newInvoice.franchiseId.slice(-1)}`,
        amount: Number(newInvoice.amount),
        date: new Date().toISOString().split("T")[0],
        status: "Draft",
      }
      setInvoices([...invoices, invoice])
      setNewInvoice({})
      toast({
        title: "Invoice Generated",
        description: `Invoice ${invoice.id} has been generated for ${invoice.franchiseName}.`,
      })
    }
  }

  const handleSendInvoice = (invoiceId: string) => {
    setInvoices(invoices.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status: "Sent" } : invoice)))
    toast({
      title: "Invoice Sent",
      description: `Invoice ${invoiceId} has been sent to the franchise.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Generation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Select onValueChange={(value) => setNewInvoice({ ...newInvoice, franchiseId: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Franchise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="F001">Franchise A</SelectItem>
              <SelectItem value="F002">Franchise B</SelectItem>
              <SelectItem value="F003">Franchise C</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Amount"
            value={newInvoice.amount || ""}
            onChange={(e) => setNewInvoice({ ...newInvoice, amount: Number(e.target.value) })}
          />
          <Button onClick={handleGenerateInvoice}>Generate Invoice</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.franchiseName}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>
                  {invoice.status === "Draft" && <Button onClick={() => handleSendInvoice(invoice.id)}>Send</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

