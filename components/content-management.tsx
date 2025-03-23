"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { FileText, LinkIcon, Trash2, Edit, Plus, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContentManagement() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<any | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    type: "document",
  })

  const [contentItems, setContentItems] = useState([
    {
      id: "content-1",
      title: "March Promotion Guidelines",
      description: "Detailed guidelines for implementing the March promotions at all branches",
      url: "#",
      type: "document",
      date: "2025-03-01T10:00:00",
    },
    {
      id: "content-2",
      title: "New Menu Items Training Video",
      description: "Training video for preparing and presenting the new menu items",
      url: "#",
      type: "video",
      date: "2025-02-15T14:30:00",
    },
    {
      id: "content-3",
      title: "Customer Service Standards Update",
      description: "Updated standards for customer service across all franchise locations",
      url: "#",
      type: "document",
      date: "2025-03-05T09:15:00",
    },
  ])

  const handleAddContent = () => {
    setEditingContent(null)
    setFormData({
      title: "",
      description: "",
      url: "",
      type: "document",
    })
    setIsDialogOpen(true)
  }

  const handleEditContent = (content: any) => {
    setEditingContent(content)
    setFormData({
      title: content.title,
      description: content.description,
      url: content.url,
      type: content.type,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteContent = (id: string) => {
    setContentItems(contentItems.filter((item) => item.id !== id))
    toast({
      title: "Content Deleted",
      description: "The content has been removed from all branch dashboards",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleTypeChange = (type: string) => {
    setFormData({
      ...formData,
      type,
    })
  }

  const handleSaveContent = () => {
    if (!formData.title || !formData.url) {
      toast({
        title: "Error",
        description: "Title and URL are required",
        variant: "destructive",
      })
      return
    }

    if (editingContent) {
      // Update existing content
      const updatedItems = contentItems.map((item) =>
        item.id === editingContent.id
          ? {
              ...item,
              title: formData.title,
              description: formData.description,
              url: formData.url,
              type: formData.type,
            }
          : item,
      )
      setContentItems(updatedItems)
      toast({
        title: "Content Updated",
        description: `"${formData.title}" has been updated`,
      })
    } else {
      // Add new content
      const newContent = {
        id: `content-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        url: formData.url,
        type: formData.type,
        date: new Date().toISOString(),
      }
      setContentItems([...contentItems, newContent])
      toast({
        title: "Content Added",
        description: `"${formData.title}" has been added to all branch dashboards`,
      })
    }

    setIsDialogOpen(false)
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <FileText className="h-5 w-5 text-red-500" />
      case "link":
        return <LinkIcon className="h-5 w-5 text-blue-500" />
      default:
        return <FileText className="h-5 w-5 text-primary" />
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Manage content shared with franchise branches</CardDescription>
          </div>
          <Button onClick={handleAddContent} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Content
          </Button>
        </CardHeader>
        <CardContent>
          {contentItems.length > 0 ? (
            <div className="space-y-4">
              {contentItems.map((content) => (
                <div key={content.id} className="flex items-start justify-between p-4 border rounded-md">
                  <div className="flex items-start gap-3">
                    {getContentIcon(content.type)}
                    <div>
                      <h3 className="font-medium">{content.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{content.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <a
                          href={content.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {content.url.substring(0, 30)}
                          {content.url.length > 30 ? "..." : ""}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <span className="text-xs text-muted-foreground">
                          Added on {new Date(content.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditContent(content)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteContent(content.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No content available</h3>
              <p className="text-muted-foreground mb-4">Add content to share with franchise branches</p>
              <Button onClick={handleAddContent}>Add Content</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingContent ? "Edit Content" : "Add New Content"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter content title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter content description"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="Enter content URL"
              />
            </div>

            <div className="space-y-2">
              <Label>Content Type</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={formData.type === "document" ? "default" : "outline"}
                  onClick={() => handleTypeChange("document")}
                  className="flex-1"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Document
                </Button>
                <Button
                  type="button"
                  variant={formData.type === "video" ? "default" : "outline"}
                  onClick={() => handleTypeChange("video")}
                  className="flex-1"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Video
                </Button>
                <Button
                  type="button"
                  variant={formData.type === "link" ? "default" : "outline"}
                  onClick={() => handleTypeChange("link")}
                  className="flex-1"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Link
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveContent}>{editingContent ? "Update Content" : "Add Content"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

