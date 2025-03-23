"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderList } from "@/components/order-list"
import { MenuManagement } from "@/components/menu-management"
import { BranchStatistics } from "@/components/branch-statistics"
import { HubHeader } from "@/components/hub-header"
import { ContentManagement } from "@/components/content-management"
import { OperatorManagement } from "@/components/operator-management"
import { OrderCalendar } from "@/components/order-calendar"

export function HubDashboard() {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <div className="container mx-auto p-4">
      <HubHeader hubName="Central Production Hub" />

      <Tabs defaultValue="orders" className="mt-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="orders">Incoming Orders</TabsTrigger>
          <TabsTrigger value="calendar">Order Calendar</TabsTrigger>
          <TabsTrigger value="menu">Menu Management</TabsTrigger>
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="operators">Operators</TabsTrigger>
          <TabsTrigger value="statistics">Branch Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <OrderList />
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <OrderCalendar />
        </TabsContent>

        <TabsContent value="menu" className="mt-6">
          <MenuManagement />
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <ContentManagement />
        </TabsContent>

        <TabsContent value="operators" className="mt-6">
          <OperatorManagement />
        </TabsContent>

        <TabsContent value="statistics" className="mt-6">
          <BranchStatistics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

