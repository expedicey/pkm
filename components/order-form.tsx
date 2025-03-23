"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { menuItems } from "@/lib/data"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

export function OrderForm() {
  const { toast } = useToast()
  const [selectedItem, setSelectedItem] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer")

  const handleAddItem = () => {
    if (!selectedItem) {
      toast({
        title: "Error",
        description: "Please select an item",
        variant: "destructive",
      })
      return
    }

    const menuItem = menuItems.find((item) => item.id === selectedItem)
    if (!menuItem) return

    const existingItemIndex = orderItems.findIndex((item) => item.id === selectedItem)

    if (existingItemIndex >= 0) {
      const updatedItems = [...orderItems]
      updatedItems[existingItemIndex].quantity += quantity
      setOrderItems(updatedItems)
    } else {
      setOrderItems([
        ...orderItems,
        {
          id: menuItem.id,
          name: menuItem.name,
          quantity,
          price: menuItem.price,
        },
      ])
    }

    setSelectedItem("")
    setQuantity(1)
  }

  const handleRemoveItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmitOrder = () => {
    if (orderItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one item to your order",
        variant: "destructive",
      })
      return
    }

    if (
      (paymentMethod === "bank_transfer" || paymentMethod === "qris") &&
      !(document.getElementById("payment-proof") as HTMLInputElement)?.files?.length
    ) {
      toast({
        title: "Error",
        description: "Please upload your payment proof",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would submit the order to a backend here
    toast({
      title: "Order Placed",
      description: `Your order has been placed successfully and is awaiting approval. Total: Rp${calculateTotal().toLocaleString()}`,
    })

    // Reset form
    setOrderItems([])
    setPaymentMethod("bank_transfer")
  }

  return (
    <Card className="glassmorphism bg-card/50 dark:bg-card/30 border-black/5 dark:border-white/10 neumorphic-flat overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Place New Order</CardTitle>
        <CardDescription>Select items from the menu and specify quantities</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4 glassmorphism p-4 rounded-xl">
            <div className="flex-1 space-y-2">
              <Label htmlFor="item" className="text-sm font-medium opacity-80">Select Item</Label>
              <Select value={selectedItem} onValueChange={setSelectedItem}>
                <SelectTrigger id="item" className="bg-card/50 dark:bg-card/40 backdrop-blur-sm border-black/5 dark:border-white/10 rounded-xl h-11 neumorphic-flat">
                  <SelectValue placeholder="Select an item" />
                </SelectTrigger>
                <SelectContent className="glassmorphism bg-card/60 dark:bg-card/50 backdrop-blur-md border-black/5 dark:border-white/10">
                  {menuItems.map((item) => (
                    <SelectItem key={item.id} value={item.id} className="focus:bg-primary/20">
                      {item.name} - Rp{item.price.toLocaleString()} (Lead time: {item.leadTime} days)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-24 space-y-2">
              <Label htmlFor="quantity" className="text-sm font-medium opacity-80">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                className="bg-card/50 dark:bg-card/40 backdrop-blur-sm border-black/5 dark:border-white/10 rounded-xl h-11 neumorphic-flat"
              />
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleAddItem} 
                className="btn-neumorphic h-11"
              >
                Add Item
              </Button>
            </div>
          </div>

          {orderItems.length > 0 && (
            <div className="mt-6 glassmorphism rounded-xl p-4">
              <h3 className="font-medium mb-3 text-sm opacity-90">Order Items</h3>
              <div className="space-y-2">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-lg neumorphic-flat">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {item.quantity} x Rp{item.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">Rp{(item.price * item.quantity).toLocaleString()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="h-8 w-8 p-0 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-500"
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                <span className="font-medium">Total</span>
                <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Rp{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          )}

          <Separator className="my-4 opacity-20" />

          <div className="space-y-4 glassmorphism p-4 rounded-xl">
            <div className="space-y-2">
              <Label htmlFor="payment" className="text-sm font-medium opacity-80">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="payment" className="bg-card/50 dark:bg-card/40 backdrop-blur-sm border-black/5 dark:border-white/10 rounded-xl h-11 neumorphic-flat">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="glassmorphism bg-card/60 dark:bg-card/50 backdrop-blur-md border-black/5 dark:border-white/10">
                  <SelectItem value="bank_transfer" className="focus:bg-primary/20">Bank Transfer</SelectItem>
                  <SelectItem value="qris" className="focus:bg-primary/20">QRIS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(paymentMethod === "bank_transfer" || paymentMethod === "qris") && (
              <div className="space-y-4">
                <div className="p-4 glassmorphism rounded-xl text-sm">
                  {paymentMethod === "bank_transfer" ? (
                    <>
                      <p className="font-medium">Bank Transfer Details:</p>
                      <p className="mt-2">Bank: BCA</p>
                      <p>Account Number: 1234567890</p>
                      <p>Account Name: Central Production Hub</p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium">QRIS Payment:</p>
                      <div className="flex justify-center my-3">
                        <div className="border border-black/5 dark:border-white/10 p-1 rounded-lg neumorphic-flat bg-white">
                          <img
                            src="/placeholder.svg?height=150&width=150"
                            alt="QRIS Code"
                            className="h-40 w-40"
                          />
                        </div>
                      </div>
                      <p>Scan the QR code above with your mobile banking app</p>
                    </>
                  )}
                  <p className="mt-2 text-muted-foreground">Please include your branch name in the payment description</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-proof" className="text-sm font-medium opacity-80">Upload Payment Proof</Label>
                  <Input 
                    id="payment-proof" 
                    type="file" 
                    accept=".jpg,.jpeg,.png,.pdf" 
                    className="cursor-pointer bg-card/50 dark:bg-card/40 backdrop-blur-sm border-black/5 dark:border-white/10 rounded-xl py-2 neumorphic-flat"
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload receipt or screenshot of your payment (JPG, PNG, or PDF)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button 
          onClick={handleSubmitOrder} 
          className="w-full btn-neumorphic"
          disabled={orderItems.length === 0}
        >
          Place Order
        </Button>
      </CardFooter>
    </Card>
  )
}

