import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Users, Bot, Workflow } from "lucide-react"

interface WorkspaceHeaderProps {
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null
    }
    teamName?: string
    teamDescription?: string
    teamImage?: string
}

export function WorkspaceHeader({
                                    user,
                                    teamName = "AI Agents Workspace",
                                    teamDescription = "Build and deploy AI agents for your business",
                                    teamImage,
                                }: WorkspaceHeaderProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Avatar className="h-20 w-20 rounded-md bg-gradient-to-br from-primary to-primary/60">
                    {teamImage ? (
                        <AvatarImage src={teamImage} alt={teamName} className="rounded-md" />
                    ) : (
                        <AvatarFallback className="rounded-md text-primary-foreground text-xl">
                            {teamName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    )}
                </Avatar>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">{teamName}</h1>
                    <p className="text-sm text-muted-foreground">{teamDescription}</p>

                    <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <Settings className="h-3.5 w-3.5" />
                            Settings
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <Users className="h-3.5 w-3.5" />
                            Team
                        </Button>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="agents" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
                    <TabsTrigger value="agents" className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        <span className="hidden md:inline">Agents</span>
                    </TabsTrigger>
                    <TabsTrigger value="workflows" className="flex items-center gap-2">
                        <Workflow className="h-4 w-4" />
                        <span className="hidden md:inline">Workflows</span>
                    </TabsTrigger>
                    <TabsTrigger value="team" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="hidden md:inline">Team</span>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

