"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type Announcement = {
  id: number
  message: string
  type: "info" | "warning" | "critical"
  timestamp: string
}

// Mock function to simulate fetching announcements from an API
const fetchAnnouncements = (): Promise<Announcement[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          message: "Supplier delay for Chocolate chips - plan accordingly for the next two weeks.",
          type: "warning",
          timestamp: "2023-06-15T10:30:00Z",
        },
        {
          id: 2,
          message: "New summer menu items available for ordering starting next month.",
          type: "info",
          timestamp: "2023-06-14T14:45:00Z",
        },
        {
          id: 3,
          message: "Urgent: Recall on recent batch of vanilla extract. Check your inventory immediately.",
          type: "critical",
          timestamp: "2023-06-13T09:15:00Z",
        },
      ])
    }, 1000) // Simulate network delay
  })
}

export function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  useEffect(() => {
    const getAnnouncements = async () => {
      const fetchedAnnouncements = await fetchAnnouncements()
      setAnnouncements(fetchedAnnouncements)
    }

    getAnnouncements()

    // Set up polling to check for new announcements every 5 minutes
    const intervalId = setInterval(getAnnouncements, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  const removeAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id))
  }

  const getAlertVariant = (type: Announcement["type"]) => {
    switch (type) {
      case "info":
        return "default"
      case "warning":
        return "warning"
      case "critical":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Announcements from Central Hub</CardTitle>
      </CardHeader>
      <CardContent>
        {announcements.length === 0 ? (
          <p>No current announcements.</p>
        ) : (
          announcements.map((announcement) => (
            <Alert key={announcement.id} variant={getAlertVariant(announcement.type)} className="mb-4">
              <AlertTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeAnnouncement(announcement.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </AlertTitle>
              <AlertDescription>
                <p>{announcement.message}</p>
                <div className="mt-2 flex justify-between items-center">
                  <Badge variant="outline">{new Date(announcement.timestamp).toLocaleString()}</Badge>
                </div>
              </AlertDescription>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  )
}

