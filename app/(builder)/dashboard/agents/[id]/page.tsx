import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ChatWidget } from "@/components/chat/chat-widget"
import { ArrowRight, Code, MessageSquare, Workflow } from 'lucide-react'

export const metadata: Metadata = {
    title: "Agent Details - AI Agents Platform",
    description: "View and manage your AI agent",
}

interface AgentPageProps {
    params: {
        id: string
    }
}

export default function AgentPage({ params }: AgentPageProps) {
    // In a real app, you would fetch the agent data from your API
    const agent = {
        id: params.id,
        name: "Customer Support",
        description: "Handles customer inquiries and support tickets with natural language understanding",
        icon: "CS",
        color: "bg-blue-500",
        lastDeployed: "2 hours ago",
        status: "online" as const,
        stats: {
            messages: 1284,
            users: 452,
            messagesLast30Days: 4328,
            avgResponseTime: "1.2s",
            satisfaction: "92%"
        },
    }

    // If agent not found, show 404
    if (!agent) {
        notFound()
    }

    return (
        <div className="max-w-7xl mx-auto py-6 px-8">
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/agents">Agents</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{agent.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 w-full">
                <div className="flex items-center gap-4">
                    <Avatar className={`h-12 w-12 rounded-md ${agent.color}`}>
                        <AvatarFallback className="rounded-md text-white">{agent.icon}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{agent.name}</h1>
                        <p className="text-muted-foreground">{agent.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Preview</Button>
                    <Button>Edit Agent</Button>
                </div>
            </div>

            <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="conversations">Conversations</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="embed">Embed</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-0">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{agent.stats.messagesLast30Days.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">Last 30 days</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{agent.stats.users.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">Last 30 days</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{agent.stats.avgResponseTime}</div>
                                <p className="text-xs text-muted-foreground">Last 30 days</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{agent.stats.satisfaction}</div>
                                <p className="text-xs text-muted-foreground">Based on feedback</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="md:col-span-1">
                            <CardHeader>
                                <CardTitle>Agent Preview</CardTitle>
                                <CardDescription>
                                    This is how your agent will appear to users
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="h-[400px] p-0 relative">
                                <ChatWidget
                                    agentName={agent.name}
                                    agentInitials={agent.icon}
                                    agentColor={agent.color}
                                    embedded={true}
                                />
                            </CardContent>
                        </Card>

                        <div className="grid gap-6 md:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                    <CardDescription>
                                        Common tasks for managing your agent
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <Link href={`/dashboard/agents/${agent.id}/embed`} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                                <Code className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Embed on Website</h3>
                                                <p className="text-sm text-muted-foreground">Get code to add to your site</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    </Link>

                                    <Link href={`/dashboard/agents/${agent.id}/conversations`} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                                <MessageSquare className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">View Conversations</h3>
                                                <p className="text-sm text-muted-foreground">See how users interact with your agent</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    </Link>

                                    <Link href={`/dashboard/agents/${agent.id}/workflows`} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                                <Workflow className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Configure Workflows</h3>
                                                <p className="text-sm text-muted-foreground">Set up automated processes</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="conversations" className="mt-0">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Conversations</CardTitle>
                            <CardDescription>
                                View and analyze conversations with your agent
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <MessageSquare className="h-8 w-8 text-muted-foreground" />
                                    <h3 className="text-lg font-medium">No conversations yet</h3>
                                    <p className="text-sm text-muted-foreground max-w-[300px]">
                                        Conversations will appear here once users start interacting with your agent.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="settings" className="mt-0">
                    <Card>
                        <CardHeader>
                            <CardTitle>Agent Settings</CardTitle>
                            <CardDescription>
                                Configure your agent&#39;s behavior and appearance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Settings panel is under development. Check back soon for more options.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="embed" className="mt-0">
                    <Card>
                        <CardHeader>
                            <CardTitle>Embed Your Agent</CardTitle>
                            <CardDescription>
                                Get the code to embed your agent on your website
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-6">
                            <div className="mb-4 rounded-full bg-primary/10 p-3">
                                <Code className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-center font-medium">Ready to embed your agent?</h3>
                            <p className="mt-1 text-center text-sm text-muted-foreground max-w-md">
                                Add your agent to your website with a simple embed code. Your users can interact with your agent directly on your site.
                            </p>
                            <Button asChild className="mt-4">
                                <Link href={`/dashboard/agents/${agent.id}/embed`}>
                                    Get Embed Code
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
