"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { UserPlus, User, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function OperatorManagement() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingOperator, setEditingOperator] = useState<any | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "operator",
    isActive: true,
  })

  const [operators, setOperators] = useState([
    {
      id: "op-001",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      isActive: true,
      lastActive: "2025-03-10T08:30:00",
      activityLog: [
        { action: "Approved Order #order-2", timestamp: "2025-03-07T10:15:00" },
        { action: "Marked Order #order-1 as Shipped", timestamp: "2025-03-06T14:20:00" },
      ],
    },
    {
      id: "op-002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "operator",
      isActive: true,
      lastActive: "2025-03-09T15:45:00",
      activityLog: [{ action: "Rejected Order #order-6", timestamp: "2025-03-09T15:30:00" }],
    },
    {
      id: "op-003",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "operator",
      isActive: false,
      lastActive: "2025-02-28T11:20:00",
      activityLog: [],
    },
  ])

  const [selectedOperator, setSelectedOperator] = useState<any | null>(null)
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false)

  const handleAddOperator = () => {
    setEditingOperator(null)
    setFormData({
      name: "",
      email: "",
      role: "operator",
      isActive: true,
    })
    setIsDialogOpen(true)
  }

  const handleEditOperator = (operator: any) => {
    setEditingOperator(operator)
    setFormData({
      name: operator.name,
      email: operator.email,
      role: operator.role,
      isActive: operator.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteOperator = (id: string) => {
    setOperators(operators.filter((op) => op.id !== id))
    toast({
      title: "Operator Deleted",
      description: "The operator account has been removed",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRoleChange = (role: string) => {
    setFormData({
      ...formData,
      role,
    })
  }

  const handleToggleActive = (checked: boolean) => {
    setFormData({
      ...formData,
      isActive: checked,
    })
  }

  const handleSaveOperator = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive",
      })
      return
    }

    if (editingOperator) {
      // Update existing operator
      const updatedOperators = operators.map((op) =>
        op.id === editingOperator.id
          ? {
              ...op,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              isActive: formData.isActive,
            }
          : op,
      )
      setOperators(updatedOperators)
      toast({
        title: "Operator Updated",
        description: `${formData.name}'s account has been updated`,
      })
    } else {
      // Add new operator
      const newOperator = {
        id: `op-${Date.now().toString().slice(-3)}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        isActive: formData.isActive,
        lastActive: new Date().toISOString(),
        activityLog: [],
      }
      setOperators([...operators, newOperator])
      toast({
        title: "Operator Added",
        description: `${formData.name} has been added as an operator`,
      })
    }

    setIsDialogOpen(false)
  }

  const viewActivityLog = (operator: any) => {
    setSelectedOperator(operator)
    setIsActivityLogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Operator Management</CardTitle>
            <CardDescription>Manage operator accounts and permissions</CardDescription>
          </div>
          <Button onClick={handleAddOperator} className="flex items-center gap-1">
            <UserPlus className="h-4 w-4" />
            Add Operator
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Operator</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operators.map((operator) => (
                <TableRow key={operator.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{operator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{operator.name}</p>
                        <p className="text-xs text-muted-foreground">{operator.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={operator.role === "admin" ? "default" : "outline"}>
                      {operator.role === "admin" ? "Administrator" : "Operator"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {operator.isActive ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <XCircle className="h-4 w-4" />
                        <span>Inactive</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{new Date(operator.lastActive).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewActivityLog(operator)}
                      disabled={operator.activityLog.length === 0}
                    >
                      View Log
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditOperator(operator)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteOperator(operator.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        disabled={operator.role === "admin"}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
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
            <DialogTitle>{editingOperator ? "Edit Operator" : "Add New Operator"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter operator name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter operator email"
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={formData.role === "operator" ? "default" : "outline"}
                  onClick={() => handleRoleChange("operator")}
                  className="flex-1"
                >
                  <User className="h-4 w-4 mr-2" />
                  Operator
                </Button>
                <Button
                  type="button"
                  variant={formData.role === "admin" ? "default" : "outline"}
                  onClick={() => handleRoleChange("admin")}
                  className="flex-1"
                >
                  <User className="h-4 w-4 mr-2" />
                  Administrator
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="isActive">Account Status</Label>
              <div className="flex items-center gap-2">
                <Switch id="isActive" checked={formData.isActive} onCheckedChange={handleToggleActive} />
                <Label htmlFor="isActive">{formData.isActive ? "Active" : "Inactive"}</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveOperator}>{editingOperator ? "Update Operator" : "Add Operator"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedOperator && (
        <Dialog open={isActivityLogOpen} onOpenChange={setIsActivityLogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Activity Log</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{selectedOperator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedOperator.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedOperator.email}</p>
                </div>
              </div>

              {selectedOperator.activityLog.length > 0 ? (
                <div className="space-y-3 mt-2 pl-2 border-l-2 border-muted">
                  {selectedOperator.activityLog.map((activity: any, index: number) => (
                    <div key={index} className="relative pl-4 pb-3">
                      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">No activity recorded yet</div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

