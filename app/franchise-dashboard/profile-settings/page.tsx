import type { Metadata } from "next"
import { FranchiseDetails } from "@/components/franchise-details"
import { UserManagement } from "@/components/user-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Profile & Settings",
  description: "Manage your franchise profile and user settings",
}

export default function ProfileSettingsPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Profile & Settings</h2>
      </div>
      <Tabs defaultValue="franchise-details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="franchise-details">Franchise Details</TabsTrigger>
          <TabsTrigger value="user-management">User Management</TabsTrigger>
        </TabsList>
        <TabsContent value="franchise-details" className="space-y-4">
          <FranchiseDetails />
        </TabsContent>
        <TabsContent value="user-management" className="space-y-4">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </>
  )
}

