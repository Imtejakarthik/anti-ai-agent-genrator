"use client"

import { useState } from "react"
import { Check, Copy, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { ChatWidget } from "@/components/chat/chat-widget"
import { Card, CardContent } from "@/components/ui/card"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface EmbedCodeGeneratorProps {
  agentId: string
  agentName: string
  agentAvatar?: string
  agentInitials?: string
}

export function EmbedCodeGenerator({
  agentId,
  agentName,
  agentAvatar,
  agentInitials = "AI"
}: EmbedCodeGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const [welcomeMessage, setWelcomeMessage] = useState("Hi there! How can I help you today?")
  const [placeholder, setPlaceholder] = useState("Type your message...")
  const [position, setPosition] = useState("right")
  const [primaryColor, setPrimaryColor] = useState("#0091ff")
  const [previewMode, setPreviewMode] = useState("desktop")
  const [previewTab, setPreviewTab] = useState("widget")

  // Generate the embed code based on current settings
  const generateEmbedCode = () => {
    return `<!-- AI Chat Widget -->
<script>
  (function(w, d, s, o) {
    var j = d.createElement(s);
    j.async = true;
    j.src = 'https://yourdomain.com/widget.js';
    j.dataset.agentId = '${agentId}';
    j.dataset.position = '${position}';
    j.dataset.color = '${primaryColor}';
    j.dataset.welcomeMessage = '${welcomeMessage.replace(/'/g, "\\'")}';
    j.dataset.placeholder = '${placeholder.replace(/'/g, "\\'")}';
    d.head.appendChild(j);
  })(window, document, 'script');
</script>
<!-- End AI Chat Widget -->`;
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateEmbedCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-medium mb-4">Widget Settings</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="welcome-message">Welcome Message</Label>
              <Textarea
                id="welcome-message"
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                placeholder="Enter a welcome message"
                className="resize-none"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="placeholder">Input Placeholder</Label>
              <Input
                id="placeholder"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                placeholder="Enter a placeholder text"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="position">Widget Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Bottom Left</SelectItem>
                    <SelectItem value="right">Bottom Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="color">Primary Color</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: primaryColor }}
                        />
                        <span>{primaryColor}</span>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3">
                    <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-4">Embed Code</h2>
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Textarea
                  value={generateEmbedCode()}
                  readOnly
                  className="min-h-[150px] font-mono text-sm resize-none"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-2"
                  onClick={handleCopyCode}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Add this code to your website to embed the chat widget. Place it before the closing &lt;/body&gt; tag.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Preview</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewTab(previewTab === "widget" ? "embedded" : "widget")}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Switch View
            </Button>
            <Select value={previewMode} onValueChange={setPreviewMode}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs value={previewTab} onValueChange={setPreviewTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="widget">Widget</TabsTrigger>
            <TabsTrigger value="embedded">Embedded</TabsTrigger>
          </TabsList>
          
          <TabsContent value="widget" className="mt-0">
            <div 
              className="relative border rounded-lg overflow-hidden bg-muted/30"
              style={{
                height: previewMode === "desktop" ? "500px" : previewMode === "tablet" ? "400px" : "350px",
                width: previewMode === "desktop" ? "100%" : previewMode === "tablet" ? "450px" : "320px",
                margin: "0 auto"
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <p>Website Preview</p>
              </div>
              
              <ChatWidget
                agentName={agentName}
                agentAvatar={agentAvatar}
                agentInitials={agentInitials}
                welcomeMessage={welcomeMessage}
                placeholder={placeholder}
                primaryColor={primaryColor}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="embedded" className="mt-0">
            <div 
              className="border rounded-lg overflow-hidden"
              style={{
                height: previewMode === "desktop" ? "500px" : previewMode === "tablet" ? "400px" : "350px",
                width: previewMode === "desktop" ? "100%" : previewMode === "tablet" ? "450px" : "320px",
                margin: "0 auto"
              }}
            >
              <ChatWidget
                agentName={agentName}
                agentAvatar={agentAvatar}
                agentInitials={agentInitials}
                welcomeMessage={welcomeMessage}
                placeholder={placeholder}
                primaryColor={primaryColor}
                embedded={true}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
