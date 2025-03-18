import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EmbedCodeGenerator } from "@/components/chat/embed-code-generator"
import { EmbedDocumentation } from "@/components/chat/embed-documentation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, FileText, Globe, Settings } from "lucide-react"

export const metadata: Metadata = {
    title: "Agent Embed - AI Agents Platform",
    description: "Embed your AI agent on your website",
}

interface AgentEmbedPageProps {
    params: {
        id: string
    }
}

export default function AgentEmbedPage({ params }: AgentEmbedPageProps) {
    // In a real app, you would fetch the agent data from your API
    const agent = {
        id: params.id,
        name: "Customer Support",
        description: "Handles customer inquiries and support tickets",
        icon: "CS",
        color: "bg-blue-500",
        initials: "CS",
        avatar: undefined, // You could add an avatar URL here
    }

    // If agent not found, show 404
    if (!agent) {
        notFound()
    }

    return (
        <div className="container mx-auto py-6">
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
                        <BreadcrumbLink href={`/dashboard/agents/${agent.id}`}>{agent.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Embed</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Embed {agent.name}</h1>
                <p className="text-muted-foreground mt-2">
                    Configure and get the embed code for your agent to add to your website.
                </p>
            </div>

            <Tabs defaultValue="documentation">
                <TabsList className="mb-6">
                    <TabsTrigger value="documentation" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Documentation
                    </TabsTrigger>
                    <TabsTrigger value="embed" className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Embed Code
                    </TabsTrigger>
                    <TabsTrigger value="websites" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Websites
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="documentation" className="mt-0">
                    <EmbedDocumentation agentId={agent.id} agentName={agent.name} />
                </TabsContent>

                <TabsContent value="embed" className="mt-0">
                    <EmbedCodeGenerator
                        agentId={agent.id}
                        agentName={agent.name}
                        agentInitials={agent.initials}
                        agentAvatar={agent.avatar}
                    />
                </TabsContent>

                <TabsContent value="websites" className="mt-0">
                    <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                        <div className="flex flex-col items-center gap-1 text-center">
                            <Globe className="h-8 w-8 text-muted-foreground" />
                            <h3 className="text-lg font-medium">No websites connected</h3>
                            <p className="text-sm text-muted-foreground max-w-[300px]">
                                When your agent is embedded on a website, it will appear here.
                            </p>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-0">
                    <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                        <div className="flex flex-col items-center gap-1 text-center">
                            <Settings className="h-8 w-8 text-muted-foreground" />
                            <h3 className="text-lg font-medium">Advanced settings</h3>
                            <p className="text-sm text-muted-foreground max-w-[300px]">
                                Advanced settings will be available soon. For now, you can configure basic settings in the Embed Code
                                tab.
                            </p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

