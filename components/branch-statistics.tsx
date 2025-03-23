"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { orders, branches } from "@/lib/data"

export function BranchStatistics() {
  const [timeframe, setTimeframe] = useState("month")

  // Calculate statistics for each branch
  const branchStats = branches.map((branch) => {
    const branchOrders = orders.filter((order) => order.branchId === branch.id)

    const totalOrders = branchOrders.length
    const totalRevenue = branchOrders.reduce((sum, order) => sum + order.total, 0)
    const completedOrders = branchOrders.filter((order) => order.status === "completed").length
    const pendingOrders = branchOrders.filter((order) => order.status === "pending").length
    const processingOrders = branchOrders.filter((order) => order.status === "processing").length

    return {
      ...branch,
      totalOrders,
      totalRevenue,
      completedOrders,
      pendingOrders,
      processingOrders,
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Branch Statistics</h2>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">Across all branches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {timeframe === "month" ? "+5.2% from last month" : "+12.3% from last period"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((order) => order.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Waiting to be processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Branches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branches.length}</div>
            <p className="text-xs text-muted-foreground">Placing orders this {timeframe}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Branch Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Branch Performance</CardTitle>
              <CardDescription>Overview of all branches for the selected timeframe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {branchStats.map((branch) => (
                  <div key={branch.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{branch.name}</h3>
                      <span className="text-sm font-medium">Rp{branch.totalRevenue.toLocaleString()}</span>
                    </div>

                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(branch.totalOrders / Math.max(...branchStats.map((b) => b.totalOrders))) * 100}%`,
                        }}
                      />
                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{branch.totalOrders} orders</span>
                      <span>
                        {branch.completedOrders} completed,
                        {branch.processingOrders} processing,
                        {branch.pendingOrders} pending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Branch Statistics</CardTitle>
              <CardDescription>Detailed breakdown of branch performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {branchStats.map((branch) => (
                  <div key={branch.id} className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2">{branch.name}</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Total Orders</h4>
                        <p className="text-xl font-bold">{branch.totalOrders}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Total Revenue</h4>
                        <p className="text-xl font-bold">Rp{branch.totalRevenue.toLocaleString()}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Avg. Order Value</h4>
                        <p className="text-xl font-bold">
                          Rp
                          {branch.totalOrders > 0
                            ? Math.round(branch.totalRevenue / branch.totalOrders).toLocaleString()
                            : 0}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Completion Rate</h4>
                        <p className="text-xl font-bold">
                          {branch.totalOrders > 0 ? Math.round((branch.completedOrders / branch.totalOrders) * 100) : 0}
                          %
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-3 bg-muted rounded-md">
                        <h4 className="text-sm font-medium">Completed</h4>
                        <p className="text-lg font-bold">{branch.completedOrders}</p>
                      </div>

                      <div className="p-3 bg-muted rounded-md">
                        <h4 className="text-sm font-medium">Processing</h4>
                        <p className="text-lg font-bold">{branch.processingOrders}</p>
                      </div>

                      <div className="p-3 bg-muted rounded-md">
                        <h4 className="text-sm font-medium">Pending</h4>
                        <p className="text-lg font-bold">{branch.pendingOrders}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

