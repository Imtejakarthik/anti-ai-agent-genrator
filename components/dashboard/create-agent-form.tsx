"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bot, Check, CircleHelp, Database, FileText, Globe, Loader2, MessageSquare, Palette } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Define the form schema with Zod
const formSchema = z.object({
  // Basic Info
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500),
  iconText: z.string().max(2, { message: "Icon text must be at most 2 characters." }).optional(),
  color: z.string(),
  visibility: z.enum(["public", "private", "team"]),

  // Capabilities
  model: z.string(),
  temperature: z.number().min(0).max(1),
  maxTokens: z.number().min(100).max(4000),
  capabilities: z.object({
    webSearch: z.boolean().default(false),
    codeGeneration: z.boolean().default(false),
    dataAnalysis: z.boolean().default(false),
    imageGeneration: z.boolean().default(false),
  }),

  // Knowledge
  knowledgeBase: z.enum(["none", "documents", "website", "api"]),
  documents: z.array(z.string()).optional(),
  websiteUrl: z.string().url().optional(),
  apiEndpoint: z.string().url().optional(),

  // Conversation
  systemPrompt: z.string().min(10).max(2000),
  greeting: z.string().min(5).max(200),
  contextWindow: z.number().min(1).max(20),
})

type FormValues = z.infer<typeof formSchema>

// Color options for the agent
const colorOptions = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-red-500", label: "Red" },
  { value: "bg-yellow-500", label: "Yellow" },
  { value: "bg-pink-500", label: "Pink" },
  { value: "bg-indigo-500", label: "Indigo" },
  { value: "bg-orange-500", label: "Orange" },
]

// Model options
const modelOptions = [
  { value: "gpt-4o", label: "GPT-4o", description: "Most capable model for complex tasks" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", description: "Fast and cost-effective for most use cases" },
  { value: "claude-3-opus", label: "Claude 3 Opus", description: "Advanced reasoning and comprehension" },
  { value: "claude-3-sonnet", label: "Claude 3 Sonnet", description: "Balanced performance and efficiency" },
  { value: "llama-3-70b", label: "Llama 3 (70B)", description: "Open source model with strong capabilities" },
  { value: "mistral-large", label: "Mistral Large", description: "Powerful open model for various tasks" },
]


export function CreateAgentForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      iconText: "",
      color: "bg-blue-500",
      visibility: "private",
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      maxTokens: 2000,
      capabilities: {
        webSearch: false,
        codeGeneration: false,
        dataAnalysis: false,
        imageGeneration: false,
      },
      knowledgeBase: "none",
      systemPrompt: "You are a helpful AI assistant that provides accurate and concise information.",
      greeting: "Hello! How can I assist you today?",
      contextWindow: 5,
    },
  })

  // Watch form values for real-time updates
  const watchName = form.watch("name")
  const watchColor = form.watch("color")
  const watchIconText = form.watch("iconText") || (watchName ? watchName.substring(0, 2).toUpperCase() : "AI")
  const watchKnowledgeBase = form.watch("knowledgeBase")

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log("Form data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to the agents list page after successful creation
      router.push("/dashboard/agents")
    } catch (error) {
      console.error("Error creating agent:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Navigate to the next tab
  const goToNextTab = () => {
    if (activeTab === "basic") setActiveTab("capabilities")
    else if (activeTab === "capabilities") setActiveTab("knowledge")
    else if (activeTab === "knowledge") setActiveTab("conversation")
  }

  // Navigate to the previous tab
  const goToPrevTab = () => {
    if (activeTab === "conversation") setActiveTab("knowledge")
    else if (activeTab === "knowledge") setActiveTab("capabilities")
    else if (activeTab === "capabilities") setActiveTab("basic")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="basic" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Customer Support Assistant" {...field} />
                      </FormControl>
                      <FormDescription>A clear name that describes what your agent does.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., This agent helps customers with product inquiries and support issues."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Describe what your agent does and how it can help users.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visibility</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="private" />
                            </FormControl>
                            <FormLabel className="font-normal">Private (Only you can access)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="team" />
                            </FormControl>
                            <FormLabel className="font-normal">Team (All team members can access)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="public" />
                            </FormControl>
                            <FormLabel className="font-normal">Public (Anyone with the link can access)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full md:w-1/3 space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className={`h-24 w-24 rounded-md ${watchColor}`}>
                    <AvatarFallback className="rounded-md text-white text-xl">{watchIconText}</AvatarFallback>
                  </Avatar>

                  <FormField
                    control={form.control}
                    name="iconText"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Icon Text (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="AI" maxLength={2} {...field} value={field.value || ""} />
                        </FormControl>
                        <FormDescription>Up to 2 characters for the icon.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Icon Color</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-4 gap-2">
                            {colorOptions.map((color) => (
                              <div
                                key={color.value}
                                className={cn(
                                  "h-8 w-8 rounded-md cursor-pointer border-2",
                                  color.value,
                                  field.value === color.value ? "border-primary" : "border-transparent",
                                )}
                                onClick={() => form.setValue("color", color.value)}
                              >
                                {field.value === color.value && <Check className="h-full w-full text-white p-1" />}
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={goToNextTab}>
                Next: Capabilities
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="capabilities" className="space-y-6">
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Model</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {modelOptions.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          <div className="flex flex-col">
                            <span>{model.label}</span>
                            <span className="text-xs text-muted-foreground">{model.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Choose the AI model that powers your agent.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Temperature</FormLabel>
                      <span className="text-sm text-muted-foreground">{field.value}</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={0}
                        max={1}
                        step={0.1}
                        defaultValue={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <FormDescription className="flex justify-between">
                      <span>More precise</span>
                      <span>More creative</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxTokens"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Max Tokens</FormLabel>
                      <span className="text-sm text-muted-foreground">{field.value}</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={100}
                        max={4000}
                        step={100}
                        defaultValue={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <FormDescription className="flex justify-between">
                      <span>Shorter responses</span>
                      <span>Longer responses</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium">Agent Capabilities</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <CircleHelp className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Enable specific capabilities for your agent. Some capabilities may require additional
                        configuration.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="capabilities.webSearch"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Globe className="mr-2 h-4 w-4 text-primary" />
                          <FormLabel className="font-medium">Web Search</FormLabel>
                        </div>
                        <FormDescription>Allow the agent to search the web for information</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capabilities.codeGeneration"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Bot className="mr-2 h-4 w-4 text-primary" />
                          <FormLabel className="font-medium">Code Generation</FormLabel>
                        </div>
                        <FormDescription>Enable the agent to write and explain code</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capabilities.dataAnalysis"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Database className="mr-2 h-4 w-4 text-primary" />
                          <FormLabel className="font-medium">Data Analysis</FormLabel>
                        </div>
                        <FormDescription>Allow the agent to analyze and visualize data</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capabilities.imageGeneration"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center">
                          <Palette className="mr-2 h-4 w-4 text-primary" />
                          <FormLabel className="font-medium">Image Generation</FormLabel>
                          <Badge variant="outline" className="ml-2 text-xs">
                            Premium
                          </Badge>
                        </div>
                        <FormDescription>Enable the agent to generate images from text</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPrevTab}>
                Back: Basic Info
              </Button>
              <Button type="button" onClick={goToNextTab}>
                Next: Knowledge
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <FormField
              control={form.control}
              name="knowledgeBase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Knowledge Source</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                    >
                      <FormItem className="flex flex-col items-start space-y-2 rounded-lg border p-4">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="none" />
                          </FormControl>
                          <FormLabel className="font-medium">No Additional Knowledge</FormLabel>
                        </div>
                        <FormDescription className="pl-6">Use only the AI model's built-in knowledge</FormDescription>
                      </FormItem>

                      <FormItem className="flex flex-col items-start space-y-2 rounded-lg border p-4">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="documents" />
                          </FormControl>
                          <FormLabel className="font-medium">Document Upload</FormLabel>
                        </div>
                        <FormDescription className="pl-6">Upload documents for the agent to learn from</FormDescription>
                      </FormItem>

                      <FormItem className="flex flex-col items-start space-y-2 rounded-lg border p-4">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="website" />
                          </FormControl>
                          <FormLabel className="font-medium">Website Crawling</FormLabel>
                        </div>
                        <FormDescription className="pl-6">Let the agent learn from a website's content</FormDescription>
                      </FormItem>

                      <FormItem className="flex flex-col items-start space-y-2 rounded-lg border p-4">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="api" />
                          </FormControl>
                          <FormLabel className="font-medium">API Connection</FormLabel>
                        </div>
                        <FormDescription className="pl-6">
                          Connect to an external API for real-time data
                        </FormDescription>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchKnowledgeBase === "documents" && (
              <div className="p-4 rounded-lg border border-dashed flex flex-col items-center justify-center">
                <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium">Upload Documents</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                  Upload PDF, DOCX, TXT, or CSV files. The agent will learn from these documents.
                </p>
                <Button variant="outline">Select Files</Button>
              </div>
            )}

            {watchKnowledgeBase === "website" && (
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormDescription>Enter the URL of the website you want the agent to learn from.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {watchKnowledgeBase === "api" && (
              <FormField
                control={form.control}
                name="apiEndpoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Endpoint</FormLabel>
                    <FormControl>
                      <Input placeholder="https://api.example.com/data" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormDescription>Enter the API endpoint URL that the agent should connect to.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPrevTab}>
                Back: Capabilities
              </Button>
              <Button type="button" onClick={goToNextTab}>
                Next: Conversation
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="conversation" className="space-y-6">
            <FormField
              control={form.control}
              name="systemPrompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>System Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="You are a helpful AI assistant..."
                      className="min-h-[150px] font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Instructions that define how the agent behaves. This is not visible to users.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="greeting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Greeting</FormLabel>
                  <FormControl>
                    <Input placeholder="Hello! How can I help you today?" {...field} />
                  </FormControl>
                  <FormDescription>The first message users will see when they start a conversation.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contextWindow"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Context Window (Messages)</FormLabel>
                    <span className="text-sm text-muted-foreground">{field.value}</span>
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={20}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>Less context</span>
                    <span>More context</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-4 rounded-lg border bg-muted/30">
              <h3 className="font-medium mb-2 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Conversation Preview
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar className={`h-8 w-8 rounded-md ${watchColor}`}>
                    <AvatarFallback className="rounded-md text-white">{watchIconText}</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg bg-muted p-3 text-sm">
                    {form.watch("greeting") || "Hello! How can I help you today?"}
                  </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                  <div className="rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                    Can you tell me more about your services?
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-muted">U</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPrevTab}>
                Back: Knowledge
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Agent"
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}

