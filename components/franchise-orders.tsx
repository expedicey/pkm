import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentOrders = [
  { id: "ORD001", customer: "John Doe", total: "$99.99", status: "Completed" },
  { id: "ORD002", customer: "Jane Smith", total: "$149.99", status: "Processing" },
  { id: "ORD003", customer: "Bob Johnson", total: "$79.99", status: "Shipped" },
  { id: "ORD004", customer: "Alice Brown", total: "$199.99", status: "Pending" },
  { id: "ORD005", customer: "Charlie Wilson", total: "$59.99", status: "Completed" },
]

export function FranchiseOrders() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

