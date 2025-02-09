"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ComplianceRecord = {
  id: string
  franchiseName: string
  orderDeadlineAdherence: number
  paymentTermAdherence: number
  qualityStandardsMet: boolean
  lastReviewDate: string
}

const complianceData: ComplianceRecord[] = [
  {
    id: "C001",
    franchiseName: "Franchise A",
    orderDeadlineAdherence: 95,
    paymentTermAdherence: 100,
    qualityStandardsMet: true,
    lastReviewDate: "2023-05-15",
  },
  {
    id: "C002",
    franchiseName: "Franchise B",
    orderDeadlineAdherence: 85,
    paymentTermAdherence: 90,
    qualityStandardsMet: true,
    lastReviewDate: "2023-05-10",
  },
  {
    id: "C003",
    franchiseName: "Franchise C",
    orderDeadlineAdherence: 75,
    paymentTermAdherence: 80,
    qualityStandardsMet: false,
    lastReviewDate: "2023-05-05",
  },
  {
    id: "C004",
    franchiseName: "Franchise D",
    orderDeadlineAdherence: 90,
    paymentTermAdherence: 95,
    qualityStandardsMet: true,
    lastReviewDate: "2023-05-01",
  },
  {
    id: "C005",
    franchiseName: "Franchise E",
    orderDeadlineAdherence: 80,
    paymentTermAdherence: 85,
    qualityStandardsMet: true,
    lastReviewDate: "2023-04-25",
  },
]

export function ComplianceMonitoring() {
  const [selectedFranchise, setSelectedFranchise] = useState<ComplianceRecord | null>(null)

  const getComplianceStatus = (record: ComplianceRecord) => {
    if (record.orderDeadlineAdherence >= 90 && record.paymentTermAdherence >= 90 && record.qualityStandardsMet) {
      return <Badge variant="success">Compliant</Badge>
    } else if (record.orderDeadlineAdherence >= 80 && record.paymentTermAdherence >= 80 && record.qualityStandardsMet) {
      return <Badge variant="warning">Needs Improvement</Badge>
    } else {
      return <Badge variant="destructive">Non-Compliant</Badge>
    }
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Compliance Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Franchise</TableHead>
              <TableHead>Order Deadline Adherence</TableHead>
              <TableHead>Payment Term Adherence</TableHead>
              <TableHead>Quality Standards</TableHead>
              <TableHead>Last Review</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complianceData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.franchiseName}</TableCell>
                <TableCell>{record.orderDeadlineAdherence}%</TableCell>
                <TableCell>{record.paymentTermAdherence}%</TableCell>
                <TableCell>{record.qualityStandardsMet ? "Met" : "Not Met"}</TableCell>
                <TableCell>{record.lastReviewDate}</TableCell>
                <TableCell>{getComplianceStatus(record)}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setSelectedFranchise(record)}>
                        View Report
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Compliance Report for {selectedFranchise?.franchiseName}</DialogTitle>
                        <DialogDescription>Last reviewed on {selectedFranchise?.lastReviewDate}</DialogDescription>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium">Compliance Details:</h4>
                          <ul className="list-disc list-inside mt-2">
                            <li>Order Deadline Adherence: {selectedFranchise?.orderDeadlineAdherence}%</li>
                            <li>Payment Term Adherence: {selectedFranchise?.paymentTermAdherence}%</li>
                            <li>Quality Standards: {selectedFranchise?.qualityStandardsMet ? "Met" : "Not Met"}</li>
                          </ul>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium">Recommendations:</h4>
                          <p className="mt-2 text-sm">
                            {selectedFranchise?.orderDeadlineAdherence < 90 && "Improve order deadline adherence. "}
                            {selectedFranchise?.paymentTermAdherence < 90 && "Enhance payment term adherence. "}
                            {!selectedFranchise?.qualityStandardsMet && "Focus on meeting quality standards. "}
                            {selectedFranchise?.orderDeadlineAdherence >= 90 &&
                              selectedFranchise?.paymentTermAdherence >= 90 &&
                              selectedFranchise?.qualityStandardsMet &&
                              "Maintain current performance."}
                          </p>
                        </div>
                      </DialogHeader>
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

