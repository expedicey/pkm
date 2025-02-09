"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for payments
const initialPayments = [
  { id: 1, date: "2023-06-01", amount: 5000, invoiceRef: "INV-001", status: "Paid" },
  { id: 2, date: "2023-06-15", amount: 7500, invoiceRef: "INV-002", status: "Pending" },
  { id: 3, date: "2023-05-30", amount: 3000, invoiceRef: "INV-003", status: "Overdue" },
  { id: 4, date: "2023-06-10", amount: 6000, invoiceRef: "INV-004", status: "Paid" },
  { id: 5, date: "2023-06-20", amount: 4500, invoiceRef: "INV-005", status: "Pending" },
]

// Simulated bank API integration
const simulateBankAPIReconciliation = (payments) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedPayments = payments.map((payment) => ({
        ...payment,
        status: Math.random() > 0.3 ? "Paid" : payment.status,
      }))
      resolve(updatedPayments)
    }, 2000) // Simulate a 2-second delay
  })
}

export function PaymentHistory() {
  const [payments, setPayments] = useState(initialPayments)
  const [isReconciling, setIsReconciling] = useState(false)

  useEffect(() => {
    const reconcilePayments = async () => {
      setIsReconciling(true)
      const reconciledPayments = await simulateBankAPIReconciliation(payments)
      setPayments(reconciledPayments)
      setIsReconciling(false)
    }

    const intervalId = setInterval(reconcilePayments, 60000) // Reconcile every minute

    return () => clearInterval(intervalId)
  }, [payments])

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "Pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "Overdue":
        return <Badge className="bg-red-500">Overdue</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        {isReconciling && <p className="mb-2 text-sm text-muted-foreground">Reconciling payments...</p>}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Invoice Reference</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.invoiceRef}</TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

