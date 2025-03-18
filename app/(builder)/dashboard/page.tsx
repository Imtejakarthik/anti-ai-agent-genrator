import { Bot, MessageSquare, Users, Search, Plus, BarChart3, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AgentCard } from "@/components/dashboard/agent-card"
import { CreateAgentCard } from "@/components/dashboard/create-agent-card"
import { WorkspaceHeader } from "@/components/dashboard/workspace-header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { auth } from "@/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"

export default async function DashboardPage() {
    const session = await auth()

    // Mock data for agents
    const agents = [
        {
            id: "1",
            name: "Customer Support",
            description: "Handles customer inquiries and support tickets with natural language understanding",
            icon: "CS",
            color: "bg-blue-500",
            lastDeployed: "2 hours ago",
            status: "online" as const,
            stats: { messages: 1284, users: 452 },
        },
        {
            id: "2",
            name: "Sales Assistant",
            description: "Helps with product recommendations and sales inquiries based on customer preferences",
            icon: "SA",
            color: "bg-green-500",
            lastDeployed: "1 day ago",
            status: "online" as const,
            stats: { messages: 876, users: 231 },
        },
        {
            id: "3",
            name: "Knowledge Base",
            description: "Provides answers from your documentation and knowledge base with citations",
            icon: "KB",
            color: "bg-purple-500",
            lastDeployed: "3 days ago",
            status: "draft" as const,
            stats: { messages: 342, users: 89 },
        },
    ]

    return (
        <div className="flex flex-col">
            <div className="flex flex-1 flex-col">
                {/* Main content */}
                <div className="flex-1 p-6">
                    <WorkspaceHeader user={session?.user} />

                    {/* Stats section */}
                    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <StatsCard
                            title="Total Agents"
                            value="8"
                            description="across all projects"
                            icon={<Bot className="h-4 w-4" />}
                            trend="up"
                            trendValue="25%"
                            trendPositive={true}
                        />
                        <StatsCard
                            title="Total Messages"
                            value="24.5k"
                            description="processed this month"
                            icon={<MessageSquare className="h-4 w-4" />}
                            trend="up"
                            trendValue="12%"
                            trendPositive={true}
                        />
                        <StatsCard
                            title="Active Users"
                            value="1,234"
                            description="in the last 30 days"
                            icon={<Users className="h-4 w-4" />}
                            trend="up"
                            trendValue="8%"
                            trendPositive={true}
                        />
                        <StatsCard
                            title="Conversion Rate"
                            value="3.2%"
                            description="from conversations"
                            icon={<BarChart3 className="h-4 w-4" />}
                            trend="down"
                            trendValue="0.5%"
                            trendPositive={false}
                        />
                    </div>

                    <Tabs defaultValue="agents" className="mt-8">
                        <TabsContent value="agents" className="mt-0">
                            {/* Agents section */}
                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-medium">Your Agents</h2>
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </div>

                                <div className="relative mb-6">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input placeholder="Search agents..." className="pl-10 bg-background" />
                                    <Button className="absolute right-1 top-1/2 -translate-y-1/2">
                                        <Plus className="mr-2 h-4 w-4" /> Create Agent
                                    </Button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {agents.map((agent) => (
                                        <AgentCard key={agent.id} agent={agent} />
                                    ))}
                                    <CreateAgentCard />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="workflows">
                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Workflows</CardTitle>
                                    <CardDescription>Create and manage your agent workflows</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                                        <div className="flex flex-col items-center gap-1 text-center">
                                            <div className="rounded-full bg-primary/10 p-3">
                                                <Workflow className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="text-lg font-medium">No workflows yet</h3>
                                            <p className="text-sm text-muted-foreground max-w-[300px]">
                                                Create your first workflow to connect your agents and build complex interactions
                                            </p>
                                            <Button className="mt-4">
                                                <Plus className="mr-2 h-4 w-4" /> Create Workflow
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

