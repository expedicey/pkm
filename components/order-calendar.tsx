"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { orders } from "@/lib/data"

export function OrderCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Function to check if a date has orders
  const hasOrders = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return orders.some((order) => {
      const orderDate = new Date(order.orderDate).toISOString().split("T")[0]
      return orderDate === dateString
    })
  }

  // Function to get orders for a specific date
  const getOrdersForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return orders.filter((order) => {
      const orderDate = new Date(order.orderDate).toISOString().split("T")[0]
      return orderDate === dateString
    })
  }

  // Function to handle date change
  const handleDateChange = (date: Date | undefined) => {
    setDate(date)
  }

  // Function to view order details
  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const ordersForSelectedDate = date ? getOrdersForDate(date) : []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="glassmorphism bg-card/50 dark:bg-card/30 border-black/5 dark:border-white/10 neumorphic-flat overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Order Calendar</CardTitle>
          <CardDescription>View all orders scheduled in the calendar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-2 glassmorphism rounded-xl">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="rounded-xl border-black/5 dark:border-white/10"
              modifiers={{
                hasOrders: (date) => hasOrders(date),
              }}
              modifiersStyles={{
                hasOrders: {
                  backgroundColor: "hsl(var(--primary) / 0.15)",
                  fontWeight: "bold",
                  borderRadius: "0.5rem",
                },
              }}
              classNames={{
                day_today: "bg-primary/5 text-primary font-bold rounded-md",
                day_selected: "bg-primary !text-white font-bold rounded-md neumorphic-pressed",
                day_outside: "text-muted-foreground opacity-50",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary/10 rounded-md transition-all",
                day_disabled: "text-muted-foreground opacity-25",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                nav_button: "bg-card/50 dark:bg-card/30 border-black/5 dark:border-white/10 hover:bg-primary/10 rounded-lg",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                caption: "flex justify-center py-2 relative items-center",
                caption_label: "text-sm font-medium",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                root: "p-3",
              }}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="glassmorphism bg-card/50 dark:bg-card/30 border-black/5 dark:border-white/10 neumorphic-flat overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            {date ? <>Orders for {date.toLocaleDateString()}</> : <>Select a date</>}
          </CardTitle>
          <CardDescription>{ordersForSelectedDate.length} orders scheduled</CardDescription>
        </CardHeader>
        <CardContent>
          {ordersForSelectedDate.length > 0 ? (
            <div className="space-y-3">
              {ordersForSelectedDate.map((order) => (
                <div
                  key={order.id}
                  className="p-4 glassmorphism rounded-xl cursor-pointer hover:neumorphic-pressed transition-all duration-300"
                  onClick={() => viewOrderDetails(order)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{order.branchName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} items - Rp{order.total.toLocaleString()}
                      </p>
                    </div>
                    <Badge 
                      variant={order.status === "completed" ? "default" : "outline"}
                      className={
                        order.status === "completed" 
                        ? "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30" 
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center glassmorphism rounded-xl p-4">
              <p className="text-muted-foreground">No orders scheduled for this date</p>
              <p className="text-sm text-muted-foreground mt-2">Select a different date to view orders</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="glassmorphism bg-card/70 dark:bg-card/50 backdrop-blur-md border-black/5 dark:border-white/10 neumorphic-flat sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Order Details
              </DialogTitle>
              <DialogDescription>
                Order #{selectedOrder.id} from {selectedOrder.branchName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 glassmorphism rounded-lg">
                  <h4 className="text-sm font-medium opacity-80">Order Date</h4>
                  <p className="mt-1">{new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="p-3 glassmorphism rounded-lg">
                  <h4 className="text-sm font-medium opacity-80">Estimated Completion</h4>
                  <p className="mt-1">{new Date(selectedOrder.estimatedCompletion).toLocaleDateString()}</p>
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
                <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Rp{selectedOrder.total.toLocaleString()}
                </span>
              </div>
              
              <div className="p-3 glassmorphism rounded-lg">
                <h4 className="text-sm font-medium opacity-80">Payment Status</h4>
                <div className="mt-2">
                  <Badge 
                    variant={selectedOrder.paymentStatus === "paid" ? "default" : "outline"}
                    className={
                      selectedOrder.paymentStatus === "paid" 
                      ? "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30" 
                      : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30"
                    }
                  >
                    {selectedOrder.paymentStatus}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

