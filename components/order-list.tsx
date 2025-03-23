"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { orders, operators } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, FileText, Truck, XCircle, User, Calendar, Info } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function OrderList() {
  const { toast } = useToast()
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const pendingOrders = orders.filter((order) => order.status === "pending")
  const processingOrders = orders.filter((order) => order.status === "processing")
  const completedOrders = orders.filter((order) => order.status === "completed")

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const updateOrderStatus = (newStatus: string) => {
    // In a real app, you would update the order status in the backend
    toast({
      title: "Order Updated",
      description: `Order #${selectedOrder?.id} status updated to ${newStatus}`,
    })
    setIsDialogOpen(false)
  }

  const [approvalAction, setApprovalAction] = useState<{
    orderId: string
    action: "approve" | "reject" | "ship"
    note: string
  } | null>(null)

  // Helper function to format timestamp
  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Helper function to get operator initials for avatar
  const getOperatorInitials = (name?: string) => {
    if (!name) return "";
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }

  // Helper function to get operator avatar from operators array
  const getOperatorAvatar = (operatorId?: string): string => {
    if (!operatorId) return "";
    const operator = operators.find(op => op.id === operatorId);
    return operator?.avatar || "";
  }

  return (
    <>
      <Tabs defaultValue="pending" className="glassmorphism bg-card/50 dark:bg-card/30 rounded-xl overflow-hidden neumorphic-flat p-1">
        <TabsList className="grid w-full grid-cols-3 glassmorphism rounded-lg p-1">
          <TabsTrigger value="pending" className="rounded-lg data-[state=active]:neumorphic-pressed data-[state=active]:bg-primary/10">Pending ({pendingOrders.length})</TabsTrigger>
          <TabsTrigger value="processing" className="rounded-lg data-[state=active]:neumorphic-pressed data-[state=active]:bg-primary/10">Processing ({processingOrders.length})</TabsTrigger>
          <TabsTrigger value="completed" className="rounded-lg data-[state=active]:neumorphic-pressed data-[state=active]:bg-primary/10">Completed ({completedOrders.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-4 px-4 pb-4">
          <Card className="glassmorphism bg-card/50 dark:bg-card/30 border-black/5 dark:border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Pending Orders</CardTitle>
              <CardDescription>Orders waiting to be processed</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingOrders.length > 0 ? (
                <div className="space-y-3">
                  {pendingOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 glassmorphism rounded-xl bg-card/30 dark:bg-card/20 cursor-pointer hover:neumorphic-pressed transition-all duration-300"
                      onClick={() => viewOrderDetails(order)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{order.branchName}</h3>
                          <p className="text-sm text-muted-foreground flex items-center mt-1">
                            <Calendar className="h-3.5 w-3.5 mr-1 opacity-70" />
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Rp{order.total.toLocaleString()}</p>
                          <Badge 
                            variant="outline" 
                            className="mt-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30"
                          >
                            {order.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center glassmorphism p-6 rounded-xl">
                  <p className="text-muted-foreground">No pending orders</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing" className="mt-4 px-4 pb-4">
          <Card className="glassmorphism bg-card/50 dark:bg-card/30 border-black/5 dark:border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Processing Orders</CardTitle>
              <CardDescription>Orders currently being processed</CardDescription>
            </CardHeader>
            <CardContent>
              {processingOrders.length > 0 ? (
                <div className="space-y-3">
                  {processingOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 glassmorphism rounded-xl bg-card/30 dark:bg-card/20 cursor-pointer hover:neumorphic-pressed transition-all duration-300"
                      onClick={() => viewOrderDetails(order)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{order.branchName}</h3>
                          <div className="mt-2 flex items-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center text-xs text-muted-foreground bg-primary/5 dark:bg-primary/10 py-1 px-2 rounded-full">
                                    <Avatar className="h-5 w-5 mr-1">
                                      <AvatarImage src={getOperatorAvatar(order.approvedBy?.operatorId)} alt={order.approvedBy?.operatorName} />
                                      <AvatarFallback className="text-[10px] bg-primary/20">{getOperatorInitials(order.approvedBy?.operatorName)}</AvatarFallback>
                                    </Avatar>
                                    <span>Approved by {order.approvedBy?.operatorName.split(' ')[0]}</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <div className="text-xs">
                                    <p className="font-medium">{order.approvedBy?.operatorName}</p>
                                    <p className="opacity-80 mt-1">{formatDateTime(order.approvedBy?.timestamp)}</p>
                                    {order.approvedBy?.notes && (
                                      <p className="mt-1 bg-primary/5 p-1 rounded">{order.approvedBy?.notes}</p>
                                    )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Rp{order.total.toLocaleString()}</p>
                          <Badge 
                            className="mt-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center glassmorphism p-6 rounded-xl">
                  <p className="text-muted-foreground">No processing orders</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4 px-4 pb-4">
          <Card className="glassmorphism bg-card/50 dark:bg-card/30 border-black/5 dark:border-white/10">
            <CardHeader>
              <CardTitle className="text-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Completed Orders</CardTitle>
              <CardDescription>Orders that have been completed</CardDescription>
            </CardHeader>
            <CardContent>
              {completedOrders.length > 0 ? (
                <div className="space-y-3">
                  {completedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 glassmorphism rounded-xl bg-card/30 dark:bg-card/20 cursor-pointer hover:neumorphic-pressed transition-all duration-300"
                      onClick={() => viewOrderDetails(order)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{order.branchName}</h3>
                          <div className="mt-2 flex flex-col gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center text-xs text-muted-foreground bg-primary/5 dark:bg-primary/10 py-1 px-2 rounded-full w-fit">
                                    <Avatar className="h-5 w-5 mr-1">
                                      <AvatarImage src={getOperatorAvatar(order.approvedBy?.operatorId)} alt={order.approvedBy?.operatorName} />
                                      <AvatarFallback className="text-[10px] bg-primary/20">{getOperatorInitials(order.approvedBy?.operatorName)}</AvatarFallback>
                                    </Avatar>
                                    <span>Approved by {order.approvedBy?.operatorName.split(' ')[0]}</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <div className="text-xs">
                                    <p className="font-medium">{order.approvedBy?.operatorName}</p>
                                    <p className="opacity-80 mt-1">{formatDateTime(order.approvedBy?.timestamp)}</p>
                                    {order.approvedBy?.notes && (
                                      <p className="mt-1 bg-primary/5 p-1 rounded">{order.approvedBy?.notes}</p>
                                    )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center text-xs text-muted-foreground bg-green-500/10 py-1 px-2 rounded-full w-fit">
                                    <Avatar className="h-5 w-5 mr-1">
                                      <AvatarImage src={getOperatorAvatar(order.shippedBy?.operatorId)} alt={order.shippedBy?.operatorName} />
                                      <AvatarFallback className="text-[10px] bg-green-500/20">{getOperatorInitials(order.shippedBy?.operatorName)}</AvatarFallback>
                                    </Avatar>
                                    <span>Shipped by {order.shippedBy?.operatorName.split(' ')[0]}</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <div className="text-xs">
                                    <p className="font-medium">{order.shippedBy?.operatorName}</p>
                                    <p className="opacity-80 mt-1">{formatDateTime(order.shippedBy?.timestamp)}</p>
                                    {order.shippedBy?.notes && (
                                      <p className="mt-1 bg-green-500/5 p-1 rounded">{order.shippedBy?.notes}</p>
                                    )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Rp{order.total.toLocaleString()}</p>
                          <Badge 
                            variant="default" 
                            className="mt-1 bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center glassmorphism p-6 rounded-xl">
                  <p className="text-muted-foreground">No completed orders</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="glassmorphism bg-card/70 dark:bg-card/50 backdrop-blur-md border-black/5 dark:border-white/10 neumorphic-flat max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Order Details</DialogTitle>
              <DialogDescription>
                Order #{selectedOrder.id} from {selectedOrder.branchName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 glassmorphism rounded-lg">
                  <h4 className="text-sm font-medium opacity-80">Order Date</h4>
                  <p className="mt-1">{new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="p-3 glassmorphism rounded-lg">
                  <h4 className="text-sm font-medium opacity-80">Status</h4>
                  <Badge 
                    variant={selectedOrder.status === "completed" ? "default" : "outline"}
                    className={
                      selectedOrder.status === "completed" 
                      ? "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30" 
                      : selectedOrder.status === "processing"
                      ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30"
                      : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30"
                    }
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>
              
              <div className="p-3 glassmorphism rounded-lg">
                <h4 className="text-sm font-medium opacity-80">Items</h4>
                <div className="space-y-2 mt-2">
                  {selectedOrder.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm p-2 hover:bg-primary/5 rounded-md">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between font-medium pt-3 pb-3 px-3 border-t border-black/5 dark:border-white/10 bg-primary/5 dark:bg-primary/10 rounded-lg">
                <span>Total</span>
                <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Rp{selectedOrder.total.toLocaleString()}</span>
              </div>
              
              <div className="p-3 glassmorphism rounded-lg">
                <h4 className="text-sm font-medium opacity-80">Approval Status</h4>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant={
                      selectedOrder.status === "completed"
                        ? "default"
                        : selectedOrder.status === "processing"
                          ? "outline"
                          : "secondary"
                    }
                    className={
                      selectedOrder.status === "completed" 
                      ? "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30" 
                      : selectedOrder.status === "processing"
                      ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30"
                      : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30"
                    }
                  >
                    {selectedOrder.status === "completed"
                      ? "Approved & Shipped"
                      : selectedOrder.status === "processing"
                        ? "Approved"
                        : "Awaiting Approval"}
                  </Badge>
                </div>
                
                {/* Operator Information */}
                {(selectedOrder.status === "processing" || selectedOrder.status === "completed") && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 bg-primary/5 p-2 rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={getOperatorAvatar(selectedOrder.approvedBy?.operatorId)} alt={selectedOrder.approvedBy?.operatorName} />
                        <AvatarFallback className="bg-primary/20">{getOperatorInitials(selectedOrder.approvedBy?.operatorName)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Approved by {selectedOrder.approvedBy?.operatorName}</p>
                        <p className="text-xs text-muted-foreground">{formatDateTime(selectedOrder.approvedBy?.timestamp)}</p>
                      </div>
                      {selectedOrder.approvedBy?.notes && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="bg-primary/10 p-1 rounded-full cursor-help">
                                <Info className="h-4 w-4 text-primary" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-xs">{selectedOrder.approvedBy?.notes}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    
                    {selectedOrder.status === "completed" && selectedOrder.shippedBy && (
                      <div className="flex items-center gap-2 bg-green-500/10 p-2 rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={getOperatorAvatar(selectedOrder.shippedBy?.operatorId)} alt={selectedOrder.shippedBy?.operatorName} />
                          <AvatarFallback className="bg-green-500/20">{getOperatorInitials(selectedOrder.shippedBy?.operatorName)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Shipped by {selectedOrder.shippedBy?.operatorName}</p>
                          <p className="text-xs text-muted-foreground">{formatDateTime(selectedOrder.shippedBy?.timestamp)}</p>
                        </div>
                        {selectedOrder.shippedBy?.notes && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="bg-green-500/15 p-1 rounded-full cursor-help">
                                  <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="text-xs">{selectedOrder.shippedBy?.notes}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 glassmorphism rounded-lg">
                  <h4 className="text-sm font-medium opacity-80">Payment Status</h4>
                  <Badge variant={selectedOrder.paymentStatus === "paid" ? "default" : "outline"}
                    className={
                      selectedOrder.paymentStatus === "paid" 
                      ? "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30" 
                      : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30"
                    }
                  >
                    {selectedOrder.paymentStatus}
                  </Badge>
                </div>
                <div className="p-3 glassmorphism rounded-lg">
                  <h4 className="text-sm font-medium opacity-80">Payment Method</h4>
                  <p className="mt-1 text-sm">{selectedOrder.paymentMethod.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</p>
                </div>
              </div>
              
              <div className="p-3 glassmorphism rounded-lg">
                <h4 className="text-sm font-medium opacity-80">Payment Proof</h4>
                {selectedOrder.paymentStatus === "paid" ? (
                  <div className="mt-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-primary underline cursor-pointer">View Payment Receipt</span>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">No payment proof uploaded</p>
                )}
              </div>
            </div>
            
            <DialogFooter className="flex flex-wrap gap-2 mt-4">
              {selectedOrder.status === "pending" && (
                <>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(false)
                      setApprovalAction({
                        orderId: selectedOrder.id,
                        action: "approve",
                        note: "",
                      })
                    }}
                    className="flex items-center gap-1 btn-neumorphic"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve Order
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setIsDialogOpen(false)
                      setApprovalAction({
                        orderId: selectedOrder.id,
                        action: "reject",
                        note: "",
                      })
                    }}
                    className="flex items-center gap-1 bg-red-500/90"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject Order
                  </Button>
                </>
              )}
              {selectedOrder.status === "processing" && (
                <Button
                  onClick={() => {
                    setIsDialogOpen(false)
                    setApprovalAction({
                      orderId: selectedOrder.id,
                      action: "ship",
                      note: "",
                    })
                  }}
                  className="flex items-center gap-1 btn-neumorphic"
                >
                  <Truck className="h-4 w-4" />
                  Mark as Shipped
                </Button>
              )}
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}
                className="bg-card/50 dark:bg-card/30 backdrop-blur-sm border-black/5 dark:border-white/10"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {approvalAction && (
        <Dialog open={!!approvalAction} onOpenChange={() => setApprovalAction(null)}>
          <DialogContent className="glassmorphism bg-card/70 dark:bg-card/50 backdrop-blur-md border-black/5 dark:border-white/10 neumorphic-flat">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                {approvalAction.action === "approve"
                  ? "Approve Order"
                  : approvalAction.action === "reject"
                    ? "Reject Order"
                    : "Mark as Shipped"}
              </DialogTitle>
              <DialogDescription>
                {approvalAction.action === "approve"
                  ? "Confirm that all items are available and ready for this order."
                  : approvalAction.action === "reject"
                    ? "Provide a reason for rejecting this order."
                    : "Confirm that this order has been shipped to the branch."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="note">Note (optional)</Label>
                <Textarea
                  id="note"
                  placeholder={
                    approvalAction.action === "approve"
                      ? "Any special instructions..."
                      : approvalAction.action === "reject"
                        ? "Reason for rejection..."
                        : "Shipping details, tracking number, etc."
                  }
                  value={approvalAction.note}
                  onChange={(e) => setApprovalAction({ ...approvalAction, note: e.target.value })}
                  className="min-h-[100px] glassmorphism bg-card/50 dark:bg-card/30 border-black/5 dark:border-white/10"
                />
              </div>
              
              <div className="p-3 glassmorphism rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">You will be recorded as the responsible operator</p>
                    <p className="text-xs text-muted-foreground">This action will be logged with your profile details</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setApprovalAction(null)}
                className="bg-card/50 dark:bg-card/30 backdrop-blur-sm border-black/5 dark:border-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // In a real app, you would send this to the backend
                  // For now, let's assume we're using the first operator in our list
                  const actionText =
                    approvalAction.action === "approve"
                      ? "approved"
                      : approvalAction.action === "reject"
                        ? "rejected"
                        : "marked as shipped"
                        
                  // Get the current operator who would be assigned to this action
                  const currentOperator = operators[0];
                  
                  toast({
                    title: `Order ${actionText}`,
                    description: `Order #${approvalAction.orderId} has been ${actionText} by ${currentOperator.name}`,
                  })
                  setApprovalAction(null)
                }}
                variant={approvalAction.action === "reject" ? "destructive" : "default"}
                className={approvalAction.action === "reject" ? "bg-red-500/90" : "btn-neumorphic"}
              >
                Confirm{" "}
                {approvalAction.action === "approve"
                  ? "Approval"
                  : approvalAction.action === "reject"
                    ? "Rejection"
                    : "Shipping"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

