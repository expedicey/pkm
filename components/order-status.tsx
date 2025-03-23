"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { FileText, Truck, Clock, CheckCircle, AlertCircle, Package } from "lucide-react"
import { orders } from "@/lib/data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface OrderStatusProps {
  branchId: string
}

export function OrderStatus({ branchId }: OrderStatusProps) {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter orders for this branch
  const branchOrders = orders.filter((order) => order.branchId === branchId)

  // Sort orders by date (newest first)
  const sortedOrders = [...branchOrders].sort(
    (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
  )

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  // Function to get status icon
  const getStatusIcon = (status: string, paymentStatus: string) => {
    if (status === "completed") return <CheckCircle className="h-5 w-5 text-green-500" />
    if (status === "processing") return <Package className="h-5 w-5 text-blue-500" />
    if (paymentStatus === "pending") return <AlertCircle className="h-5 w-5 text-amber-500" />
    return <Clock className="h-5 w-5 text-muted-foreground" />
  }

  // Function to get progress percentage
  const getProgressPercentage = (status: string, paymentStatus: string) => {
    if (status === "completed") return 100
    if (status === "processing") return 66
    if (paymentStatus === "paid") return 33
    return 10
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Order Status</CardTitle>
          <CardDescription>Track the status of your orders from the central hub</CardDescription>
        </CardHeader>
        <CardContent>
          {sortedOrders.length > 0 ? (
            <div className="space-y-4">
              {sortedOrders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => viewOrderDetails(order)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "processing"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {order.status === "completed"
                            ? "Completed"
                            : order.status === "processing"
                              ? "Processing"
                              : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ordered on {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Rp{order.total.toLocaleString()}</p>
                      <Badge variant={order.paymentStatus === "paid" ? "default" : "outline"} className="mt-1">
                        {order.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Order Placed</span>
                      <span>Processing</span>
                      <span>Completed</span>
                    </div>
                    <Progress value={getProgressPercentage(order.status, order.paymentStatus)} className="h-2" />

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status, order.paymentStatus)}
                        <span className="text-sm">
                          {order.status === "completed"
                            ? "Order completed and delivered"
                            : order.status === "processing"
                              ? "Order approved and being prepared"
                              : order.paymentStatus === "paid"
                                ? "Payment confirmed, awaiting approval"
                                : "Awaiting payment confirmation"}
                        </span>
                      </div>

                      {order.status === "processing" && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Avatar className="h-5 w-5 mr-1">
                            <AvatarFallback>OP</AvatarFallback>
                          </Avatar>
                          <span>Approved by Operator ID-001</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No orders found</h3>
              <p className="text-muted-foreground mb-4">You don't have any active orders at the moment</p>
              <Button>Place New Order</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Order #{selectedOrder.id} placed on {new Date(selectedOrder.orderDate).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Order Status</h4>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      selectedOrder.status === "completed"
                        ? "default"
                        : selectedOrder.status === "processing"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {selectedOrder.status === "completed"
                      ? "Completed"
                      : selectedOrder.status === "processing"
                        ? "Processing"
                        : "Pending"}
                  </Badge>

                  {(selectedOrder.status === "processing" || selectedOrder.status === "completed") && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Avatar className="h-5 w-5 mr-1">
                        <AvatarFallback>OP</AvatarFallback>
                      </Avatar>
                      <span>by Operator ID-001</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Timeline</h4>
                <div className="space-y-3 mt-2 pl-2 border-l-2 border-muted">
                  <div className="relative pl-4 pb-3">
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(selectedOrder.orderDate).toLocaleString()}
                    </p>
                  </div>

                  {selectedOrder.paymentStatus === "paid" && (
                    <div className="relative pl-4 pb-3">
                      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                      <p className="font-medium">Payment Confirmed</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(selectedOrder.orderDate).toLocaleString()}
                      </p>
                    </div>
                  )}

                  {selectedOrder.status === "processing" && (
                    <div className="relative pl-4 pb-3">
                      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                      <p className="font-medium">Order Approved</p>
                      <p className="text-xs text-muted-foreground">Approved by Operator ID-001</p>
                    </div>
                  )}

                  {selectedOrder.status === "completed" && (
                    <>
                      <div className="relative pl-4 pb-3">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                        <p className="font-medium">Order Approved</p>
                        <p className="text-xs text-muted-foreground">Approved by Operator ID-001</p>
                      </div>
                      <div className="relative pl-4">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                        <p className="font-medium">Order Shipped</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(selectedOrder.estimatedCompletion).toLocaleString()}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium">Items</h4>
                <div className="space-y-2 mt-2">
                  {selectedOrder.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>Rp{selectedOrder.total.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h4 className="text-sm font-medium">Payment Status</h4>
                  <Badge variant={selectedOrder.paymentStatus === "paid" ? "default" : "outline"}>
                    {selectedOrder.paymentStatus}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Payment Method</h4>
                  <p>{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              {selectedOrder.paymentStatus === "paid" && (
                <div>
                  <h4 className="text-sm font-medium">Payment Proof</h4>
                  <div className="mt-1 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-blue-600 underline cursor-pointer">View Payment Receipt</span>
                  </div>
                </div>
              )}

              {selectedOrder.status === "completed" && (
                <div>
                  <h4 className="text-sm font-medium">Shipping Information</h4>
                  <div className="mt-1 flex items-center gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Delivered on {new Date(selectedOrder.estimatedCompletion).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

