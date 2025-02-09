"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

type OperatorAction = {
  id: string
  operator: string
  action: string
  target: string
  timestamp: string
}

const actions: OperatorAction[] = [
  { id: "1", operator: "John Doe", action: "Updated inventory", target: "Product A", timestamp: "2023-06-01 10:30:00" },
  {
    id: "2",
    operator: "Jane Smith",
    action: "Processed order",
    target: "Order #1234",
    timestamp: "2023-06-01 11:15:00",
  },
  {
    id: "3",
    operator: "Mike Johnson",
    action: "Added new franchise",
    target: "Franchise X",
    timestamp: "2023-06-01 14:00:00",
  },
  {
    id: "4",
    operator: "Sarah Brown",
    action: "Modified user permissions",
    target: "User #5678",
    timestamp: "2023-06-01 15:45:00",
  },
  {
    id: "5",
    operator: "Chris Lee",
    action: "Generated report",
    target: "Monthly Sales Report",
    timestamp: "2023-06-01 17:30:00",
  },
]

export function OperatorActions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Operator</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Target</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {actions.map((action) => (
          <TableRow key={action.id}>
            <TableCell>{action.operator}</TableCell>
            <TableCell>{action.action}</TableCell>
            <TableCell>{action.target}</TableCell>
            <TableCell>{action.timestamp}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Undo action</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

