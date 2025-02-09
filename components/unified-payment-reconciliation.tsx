"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

type Payment = {
  id: string
  franchiseId: string
  franchiseName: string
  amount: number
  date: string
  status: "Matched" | "Unmatched" | "Partial"
  matchedOrderId?: string
}

const initialPayments: Payment[] = [
  {
    id: "PAY001",
    franchiseId: "F001",
    franchiseName: "Franchise A",
    amount: 1000,
    date: "2023-06-01",
    status: "Matched",
    matchedOrderId: "ORD123",
  },
  {
    id: "PAY002",
    franchiseId: "F002",
    franchiseName: "Franchise B",
    amount: 1500,
    date: "2023-06-02",
    status: "Unmatched",
  },
  {
    id: "PAY003",
    franchiseId: "F001",
    franchiseName: "Franchise A",
    amount: 750,
    date: "2023-06-03",
    status: "Partial",
    matchedOrderId: "ORD124",
  },
]

export function UnifiedPaymentReconciliation() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [searchTerm, setSearchTerm] = useState("")

  const handleReconcile = (paymentId: string) => {
    // Simulate reconciliation process
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId
          ? { ...payment, status: "Matched", matchedOrderId: `ORD${Math.floor(Math.random() * 1000)}` }
          : payment,
      ),
    )
    toast({
      title: "Payment Reconciled",
      description: `Payment ${paymentId} has been reconciled.`,
    })
  }

  const filteredPayments = payments.filter(
    (payment) =>
      payment.franchiseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unified Payment Reconciliation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search by franchise or payment ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Matched Order</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.franchiseName}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === "Matched"
                        ? "success"
                        : payment.status === "Partial"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>{payment.matchedOrderId || "N/A"}</TableCell>
                <TableCell>
                  {payment.status !== "Matched" && (
                    <Button onClick={() => handleReconcile(payment.id)}>Reconcile</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

