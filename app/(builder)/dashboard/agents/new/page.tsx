import type { Metadata } from "next"
import { ArrowLeft, Bot, Database, MessageSquare, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateAgentForm } from "@/components/dashboard/create-agent-form"
import { auth } from "@/auth"

export const metadata: Metadata = {
    title: "Create Agent",
    description: "Create a new AI agent for your workspace",
}

export default async function CreateAgentPage() {
    const session = await auth()

    return (
        <div className="container max-w-5xl py-8">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/dashboard/agents">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Create New Agent</h1>
                </div>
            </div>

            <Tabs defaultValue="basic" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic" className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        <span>Basic Info</span>
                    </TabsTrigger>
                    <TabsTrigger value="capabilities" className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span>Capabilities</span>
                    </TabsTrigger>
                    <TabsTrigger value="knowledge" className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span>Knowledge</span>
                    </TabsTrigger>
                    <TabsTrigger value="conversation" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Conversation</span>
                    </TabsTrigger>
                </TabsList>

                <Card>
                    <CardHeader>
                        <CardTitle>Create Your AI Agent</CardTitle>
                        <CardDescription>
                            Configure your AI agent to handle specific tasks and interact with your users
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CreateAgentForm user={session?.user} />
                    </CardContent>
                </Card>
            </Tabs>
        </div>
    )
}

