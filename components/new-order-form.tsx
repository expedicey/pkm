"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for menu items
const menuItems = [
  { id: 1, name: "Burger", price: 9.99, stock: 100 },
  { id: 2, name: "Pizza", price: 12.99, stock: 80 },
  { id: 3, name: "Salad", price: 7.99, stock: 50 },
  { id: 4, name: "Fries", price: 3.99, stock: 150 },
  { id: 5, name: "Soda", price: 1.99, stock: 200 },
]

const formSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.number(),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      }),
    )
    .min(1, "Please select at least one item"),
  deliveryDate: z.date({
    required_error: "Please select a delivery date",
  }),
  specialNotes: z.string().optional(),
})

export function NewOrderForm() {
  const [selectedItems, setSelectedItems] = useState<{ id: number; quantity: number }[]>([])
  const [total, setTotal] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [],
      specialNotes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send the order to your backend
    alert("Order submitted successfully!")
  }

  function addItem(itemId: number) {
    const item = menuItems.find((i) => i.id === itemId)
    if (item) {
      setSelectedItems([...selectedItems, { id: item.id, quantity: 1 }])
      updateTotal([...selectedItems, { id: item.id, quantity: 1 }])
    }
  }

  function updateQuantity(itemId: number, quantity: number) {
    const updatedItems = selectedItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    setSelectedItems(updatedItems)
    updateTotal(updatedItems)
  }

  function removeItem(itemId: number) {
    const updatedItems = selectedItems.filter((item) => item.id !== itemId)
    setSelectedItems(updatedItems)
    updateTotal(updatedItems)
  }

  function updateTotal(items: { id: number; quantity: number }[]) {
    const newTotal = items.reduce((sum, item) => {
      const menuItem = menuItems.find((i) => i.id === item.id)
      return sum + (menuItem ? menuItem.price * item.quantity : 0)
    }, 0)
    setTotal(newTotal)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Place New Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem>
                    <FormLabel>Select Items</FormLabel>
                    <FormControl>
                      <Select onValueChange={(value) => addItem(Number(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an item" />
                        </SelectTrigger>
                        <SelectContent>
                          {menuItems.map((item) => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name} - ${item.price.toFixed(2)} (Stock: {item.stock})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Select items from the menu to add to your order.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedItems.map((item) => {
                const menuItem = menuItems.find((i) => i.id === item.id)
                return (
                  <div key={item.id} className="flex items-center space-x-4">
                    <span>{menuItem?.name}</span>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="w-20"
                    />
                    <Button type="button" variant="destructive" onClick={() => removeItem(item.id)}>
                      Remove
                    </Button>
                  </div>
                )
              })}
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Delivery Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Choose the date you want the order to be delivered.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any special instructions or notes for your order"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Add any additional information or requests for your order.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>
            <div>
              <Button type="submit" className="mr-2">
                Submit Order
              </Button>
              <Button type="button" variant="outline">
                Save Draft
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

