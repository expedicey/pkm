"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

// Mock data for outstanding balances
const outstandingBalances = [
  { id: 1, invoiceRef: "INV-006", amount: 8000, dueDate: "2023-07-15" },
  { id: 2, invoiceRef: "INV-007", amount: 5500, dueDate: "2023-07-20" },
  { id: 3, invoiceRef: "INV-008", amount: 7200, dueDate: "2023-07-25" },
]

export function OutstandingBalances() {
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("")

  const handlePayment = () => {
    // Here you would typically integrate with a payment gateway
    alert(
      `Processing payment of $${selectedInvoice.amount} for invoice ${selectedInvoice.invoiceRef} via ${paymentMethod}`,
    )
    setSelectedInvoice(null)
    setPaymentMethod("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Outstanding Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice Reference</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {outstandingBalances.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.invoiceRef}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedInvoice(invoice)}>Pay Now</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Pay Invoice {invoice.invoiceRef}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="amount" className="text-right">
                            Amount
                          </label>
                          <Input id="amount" value={`$${invoice.amount.toFixed(2)}`} className="col-span-3" readOnly />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="payment-method" className="text-right">
                            Payment Method
                          </label>
                          <Select onValueChange={setPaymentMethod} value={paymentMethod}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                              <SelectItem value="e-wallet">E-Wallet</SelectItem>
                              <SelectItem value="credit-card">Credit Card</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button onClick={handlePayment} disabled={!paymentMethod}>
                        Process Payment
                      </Button>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

