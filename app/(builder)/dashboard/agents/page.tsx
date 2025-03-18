import { Metadata } from "next"
import { Plus, Search } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AgentCard } from "@/components/dashboard/agent-card"
import { CreateAgentCard } from "@/components/dashboard/create-agent-card"
import { auth } from "@/auth"
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
    title: "Agents",
    description: "Manage your AI agents",
}

export default async function AgentsPage() {
    const session = await auth()

    // Fetch agents from the database
    const agents = await prisma.agent.findMany({
        where: {
            userId: session?.user?.id as string,
        },
        orderBy: {
            updatedAt: 'desc',
        },
    })

    // Format agents for display
    const formattedAgents = agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        description: agent.description,
        icon: agent.iconText || agent.name.substring(0, 2).toUpperCase(),
        color: agent.color,
        lastDeployed: agent.lastDeployed ? new Date(agent.lastDeployed).toLocaleString() : 'Never',
        status: agent.status as 'online' | 'offline' | 'draft',
        stats: {
            messages: agent.messageCount,
            users: agent.userCount
        },
    }))

    return (
        <div className="container py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Your Agents</h1>
                <Button asChild>
                    <Link href="/dashboard/agents/new">
                        <Plus className="mr-2 h-4 w-4" /> Create Agent
                    </Link>
                </Button>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search agents..." className="pl-10 w-full md:w-72 bg-background" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {formattedAgents.map((agent) => (
                    <Link
                        key={agent.id}
                        href={`/dashboard/agents/${agent.id}`}
                        className="block hover:opacity-95 transition-opacity"
                    >
                        <AgentCard agent={agent} />
                    </Link>
                ))}
                <CreateAgentCard />
            </div>
        </div>
    )
}
