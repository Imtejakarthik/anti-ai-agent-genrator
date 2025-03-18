"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, Minimize2, Maximize2, MessageSquare } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatWidgetProps {
  agentName?: string
  agentAvatar?: string
  agentInitials?: string
  agentColor?: string
  welcomeMessage?: string
  placeholder?: string
  primaryColor?: string
  embedded?: boolean
  className?: string
}

export function ChatWidget({
  agentName = "AI Assistant",
  agentAvatar,
  agentInitials = "AI",
  agentColor = "bg-primary",
  welcomeMessage = "Hi there! How can I help you today?",
  placeholder = "Type your message...",
  primaryColor = "hsl(var(--primary))",
  embedded = false,
  className,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: welcomeMessage,
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mock response function - in a real app, this would call your API
  const getResponse = async (userMessage: string) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock responses based on user input
    let response = "I'm not sure how to respond to that. Can you try asking something else?"
    
    const lowerCaseMessage = userMessage.toLowerCase()
    
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      response = "Hello! How can I assist you today?"
    } else if (lowerCaseMessage.includes("help")) {
      response = "I'm here to help! What do you need assistance with?"
    } else if (lowerCaseMessage.includes("feature") || lowerCaseMessage.includes("product")) {
      response = "Our product offers many features including AI-powered responses, customizable widgets, and analytics. What would you like to know more about?"
    } else if (lowerCaseMessage.includes("price") || lowerCaseMessage.includes("cost")) {
      response = "We offer several pricing tiers starting at $9.99/month. Would you like me to provide more details about our pricing plans?"
    } else if (lowerCaseMessage.includes("thank")) {
      response = "You're welcome! Is there anything else I can help you with?"
    }
    
    setMessages(prev => [
      ...prev,
      {
        id: `assistant-${Date.now()}`,
        content: response,
        role: "assistant",
        timestamp: new Date(),
      },
    ])
    
    setIsLoading(false)
  }

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (!input.trim()) return
    
    const userMessage = {
      id: `user-${Date.now()}`,
      content: input,
      role: "user" as const,
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput("")
    
    await getResponse(input)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(!isMinimized)
  }

  // For embedded mode, always show the chat
  useEffect(() => {
    if (embedded) {
      setIsOpen(true)
      setIsMinimized(false)
    }
  }, [embedded])

  // Chat bubble that opens the widget
  if (!isOpen && !embedded) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 z-50"
        style={{ backgroundColor: primaryColor }}
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </button>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg shadow-lg",
        embedded ? "h-full w-full border" : "fixed bottom-4 right-4 z-50 h-[500px] w-[350px]",
        isMinimized && !embedded && "h-14",
        className
      )}
      style={{ 
        backgroundColor: "white",
        borderColor: "hsl(var(--border))"
      }}
    >
      {/* Chat header */}
      <div 
        className="flex items-center justify-between p-3"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex items-center gap-2">
          <Avatar className={cn("h-8 w-8", agentColor)}>
            {agentAvatar ? (
              <AvatarImage src={agentAvatar} alt={agentName} />
            ) : (
              <AvatarFallback className="text-primary-foreground">
                {agentInitials}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="font-medium text-white">{agentName}</span>
        </div>
        {!embedded && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white hover:bg-white/20"
              onClick={toggleMinimize}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white hover:bg-white/20"
              onClick={toggleChat}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Chat messages */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-3 bg-muted/30">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex w-full",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <Avatar className={cn("mr-2 h-8 w-8", agentColor)}>
                      {agentAvatar ? (
                        <AvatarImage src={agentAvatar} alt={agentName} />
                      ) : (
                        <AvatarFallback className="text-primary-foreground">
                          {agentInitials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <Avatar className={cn("mr-2 h-8 w-8", agentColor)}>
                    {agentAvatar ? (
                      <AvatarImage src={agentAvatar} alt={agentName} />
                    ) : (
                      <AvatarFallback className="text-primary-foreground">
                        {agentInitials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="max-w-[80%] rounded-lg bg-muted px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "0.2s" }}></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="border-t p-3">
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim() || isLoading}
                style={{ backgroundColor: primaryColor }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
