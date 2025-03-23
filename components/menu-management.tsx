"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { menuItems } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export function MenuManagement() {
  const { toast } = useToast()
  const [items, setItems] = useState(menuItems)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    leadTime: 1,
    stock: 0,
    isAvailable: true,
  })

  const handleEditItem = (item: any) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      price: item.price,
      leadTime: item.leadTime,
      stock: item.stock,
      isAvailable: item.stock > 0,
    })
    setIsDialogOpen(true)
  }

  const handleAddNewItem = () => {
    setEditingItem(null)
    setFormData({
      name: "",
      price: 0,
      leadTime: 1,
      stock: 0,
      isAvailable: true,
    })
    setIsDialogOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "name" ? value : Number(value),
    })
  }

  const handleSaveItem = () => {
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Item name is required",
        variant: "destructive",
      })
      return
    }

    if (editingItem) {
      // Update existing item
      const updatedItems = items.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item))
      setItems(updatedItems)
      toast({
        title: "Item Updated",
        description: `${formData.name} has been updated`,
      })
    } else {
      // Add new item
      const newItem = {
        id: `item-${Date.now()}`,
        ...formData,
      }
      setItems([...items, newItem])
      toast({
        title: "Item Added",
        description: `${formData.name} has been added to the menu`,
      })
    }

    setIsDialogOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Menu Management</CardTitle>
            <CardDescription>Manage your menu items, prices, and lead times</CardDescription>
          </div>
          <Button onClick={handleAddNewItem}>Add New Item</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Lead Time (days)</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className={item.stock <= 0 ? "bg-muted/50" : ""}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>Rp{item.price.toLocaleString()}</TableCell>
                  <TableCell>{item.leadTime} days</TableCell>
                  <TableCell>{item.stock} units</TableCell>
                  <TableCell>
                    {item.stock > 0 ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Out of Stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter item name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (Rp)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="leadTime">Lead Time (days)</Label>
              <Input
                id="leadTime"
                name="leadTime"
                type="number"
                min="1"
                value={formData.leadTime}
                onChange={handleInputChange}
                placeholder="Enter lead time in days"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Enter current stock"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="isAvailable"
              checked={formData.isAvailable}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  isAvailable: checked === true,
                  stock: checked === true ? formData.stock : 0,
                })
              }
            />
            <Label htmlFor="isAvailable">Item is available for ordering</Label>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveItem}>{editingItem ? "Update Item" : "Add Item"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

