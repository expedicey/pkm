import type { Metadata } from "next"
import { VisualSharedCalendar } from "@/components/visual-shared-calendar"
import { ProductionSlotAvailability } from "@/components/production-slot-availability"

export const metadata: Metadata = {
  title: "Production Calendar",
  description: "View and manage production schedules across all franchises",
}

export default function ProductionCalendarPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Production Calendar</h2>
      </div>
      <div className="space-y-4">
        <VisualSharedCalendar />
        <ProductionSlotAvailability />
      </div>
    </div>
  )
}

