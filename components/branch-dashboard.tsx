"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderForm } from "@/components/order-form"
import { OrderCalendar } from "@/components/order-calendar"
import { PaymentHistory } from "@/components/payment-history"
import { BranchHeader } from "@/components/branch-header"
import { MarketingAssets } from "@/components/marketing-assets"
import { OrderStatus } from "@/components/order-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export function BranchDashboard() {
  const [activeTab, setActiveTab] = useState("order")

  const [contentLinks, setContentLinks] = useState([
    {
      id: "content-1",
      title: "March Promotion Guidelines",
      url: "#",
      date: "2025-03-01",
    },
    {
      id: "content-2",
      title: "New Menu Items Training Video",
      url: "#",
      date: "2025-02-15",
    },
    {
      id: "content-3",
      title: "Customer Service Standards Update",
      url: "#",
      date: "2025-03-05",
    },
  ])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="fixed -top-40 -right-40 h-96 w-96 rounded-full bg-purple-700 dark:opacity-20 opacity-10 blur-3xl"></div>
      <div className="fixed -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-700 dark:opacity-20 opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto p-6">
        <BranchHeader branchName="Tangerang Branch" />
        
        <Tabs defaultValue="order" className="mt-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 rounded-xl glassmorphism p-1 border-black/5 dark:border-white/10">
            <TabsTrigger className="rounded-lg data-[state=active]:neumorphic-pressed data-[state=active]:bg-primary/20 transition-all duration-300" value="order">Place Order</TabsTrigger>
            <TabsTrigger className="rounded-lg data-[state=active]:neumorphic-pressed data-[state=active]:bg-primary/20 transition-all duration-300" value="calendar">Order Calendar</TabsTrigger>
            <TabsTrigger className="rounded-lg data-[state=active]:neumorphic-pressed data-[state=active]:bg-primary/20 transition-all duration-300" value="status">Order Status</TabsTrigger>
            <TabsTrigger className="rounded-lg data-[state=active]:neumorphic-pressed data-[state=active]:bg-primary/20 transition-all duration-300" value="payments">Payment History</TabsTrigger>
            <TabsTrigger className="rounded-lg data-[state=active]:neumorphic-pressed data-[state=active]:bg-primary/20 transition-all duration-300" value="marketing">Marketing Assets</TabsTrigger>
          </TabsList>
          
          <div className="mt-8">
            <TabsContent value="order" className="layer-1">
              <OrderForm />
            </TabsContent>
            <TabsContent value="calendar" className="layer-1">
              <OrderCalendar />
            </TabsContent>
            <TabsContent value="status" className="layer-1">
              <OrderStatus branchId="branch-2" />
            </TabsContent>
            <TabsContent value="payments" className="layer-1">
              <PaymentHistory />
            </TabsContent>
            <TabsContent value="marketing" className="layer-1">
              <MarketingAssets />
            </TabsContent>
          </div>
        </Tabs>
        
        {contentLinks.length > 0 && (
          <div className="mt-10 relative layer-2">
            <Card className="glassmorphism bg-card/50 dark:bg-card/30 border-black/5 dark:border-white/10 neumorphic-flat overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Content from Central Hub</CardTitle>
                <CardDescription>Latest updates and resources from the central production hub</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {contentLinks.map((link) => (
                    <div key={link.id} className="flex justify-between items-center p-3 hover:neumorphic-pressed hover:bg-card/40 dark:hover:bg-card/40 rounded-lg transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <a href={link.url} className="font-medium hover:text-primary transition-colors">
                          {link.title}
                        </a>
                      </div>
                      <span className="text-sm text-muted-foreground">{new Date(link.date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

