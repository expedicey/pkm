"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, Image, FileImage, FileText, FileIcon } from "lucide-react"
import { marketingAssets } from "@/lib/data"
import type { JSX } from "react/jsx-runtime"

export function MarketingAssets() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter assets based on search query and category
  const filteredAssets = marketingAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Group assets by type for the "all" view
  const groupedAssets = filteredAssets.reduce(
    (groups, asset) => {
      if (!groups[asset.category]) {
        groups[asset.category] = []
      }
      groups[asset.category].push(asset)
      return groups
    },
    {} as Record<string, typeof marketingAssets>,
  )

  // Function to handle asset download
  const handleDownload = (asset: any) => {
    // In a real app, this would trigger a download of the actual file
    // For this demo, we'll just show an alert
    alert(`Downloading ${asset.name}`)

    // In a real implementation, you would do something like:
    // window.open(asset.fileUrl, '_blank');
  }

  // Function to render the appropriate icon based on file type
  const renderFileIcon = (fileType: string) => {
    switch (fileType) {
      case "image/jpeg":
      case "image/png":
        return <Image className="h-6 w-6 text-primary" />
      case "application/pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "application/zip":
        return <FileIcon className="h-6 w-6 text-yellow-500" />
      default:
        return <FileImage className="h-6 w-6 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Marketing Assets</CardTitle>
          <CardDescription>Download marketing materials for your franchise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search assets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="product-photos">Product Photos</TabsTrigger>
              <TabsTrigger value="promotional">Promotional</TabsTrigger>
              <TabsTrigger value="logos">Logos & Branding</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {Object.keys(groupedAssets).length > 0 ? (
                Object.entries(groupedAssets).map(([category, assets]) => (
                  <div key={category} className="mb-8">
                    <h3 className="text-lg font-medium mb-4 capitalize">{category.replace("-", " ")}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {assets.map((asset) => (
                        <AssetCard
                          key={asset.id}
                          asset={asset}
                          onDownload={handleDownload}
                          renderFileIcon={renderFileIcon}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileImage className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No assets found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </TabsContent>

            {["product-photos", "promotional", "logos", "templates"].map((category) => (
              <TabsContent key={category} value={category}>
                {filteredAssets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAssets.map((asset) => (
                      <AssetCard
                        key={asset.id}
                        asset={asset}
                        onDownload={handleDownload}
                        renderFileIcon={renderFileIcon}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileImage className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No assets found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

interface AssetCardProps {
  asset: any
  onDownload: (asset: any) => void
  renderFileIcon: (fileType: string) => JSX.Element
}

function AssetCard({ asset, onDownload, renderFileIcon }: AssetCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden flex flex-col">
      <div className="h-40 bg-muted relative">
        {asset.thumbnail ? (
          <img src={asset.thumbnail || "/placeholder.svg"} alt={asset.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">{renderFileIcon(asset.fileType)}</div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-medium line-clamp-1">{asset.name}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-2 flex-1">{asset.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground">
            {asset.fileSize} • {asset.fileType.split("/")[1].toUpperCase()}
          </span>
          <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => onDownload(asset)}>
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}

