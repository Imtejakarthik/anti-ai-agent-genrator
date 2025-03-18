import { MoreHorizontal, MessageSquare, Users, ExternalLink, Edit, Trash2, Code } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface AgentCardProps {
  agent: {
    id: string
    name: string
    description: string
    icon: string
    color: string
    lastDeployed: string
    status?: "online" | "offline" | "draft"
    stats: {
      messages: number
      users: number
    }
  }
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
      <Card className="overflow-hidden bg-card border-border hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Avatar className={`h-8 w-8 rounded-md ${agent.color}`}>
              <AvatarFallback className="rounded-md text-white">{agent.icon}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold leading-none tracking-tight">{agent.name}</h3>
                {agent.status && (
                    <Badge
                        variant={agent.status === "online" ? "default" : agent.status === "offline" ? "outline" : "secondary"}
                        className="text-[10px] px-1 h-5"
                    >
                      {agent.status}
                    </Badge>
                )}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href={`/dashboard/agents/${agent.id}`}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href={`/dashboard/agents/${agent.id}/embed`}>
                  <Code className="mr-2 h-4 w-4" />
                  Embed on website
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit agent
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete agent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-border p-4 bg-muted/30">
          <div className="flex items-center text-xs text-muted-foreground">
            <MessageSquare className="mr-1 h-3 w-3" />
            {agent.stats.messages.toLocaleString()} messages
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="mr-1 h-3 w-3" />
            {agent.stats.users.toLocaleString()} users
          </div>
        </CardFooter>
      </Card>
  )
}
