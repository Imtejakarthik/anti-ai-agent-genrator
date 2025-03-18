"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, LogOut, Settings, User, Users, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

interface DashboardNavbarProps {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

export function DashboardNavbar({ user }: DashboardNavbarProps) {
    const [teams, setTeams] = useState([
        { id: "1", name: "Personal Workspace", icon: "P", members: 1, role: "Owner" },
        { id: "2", name: "Design Team", icon: "D", members: 5, role: "Admin" },
        { id: "3", name: "Marketing", icon: "M", members: 8, role: "Member" },
    ])
    const [activeTeam, setActiveTeam] = useState(teams[0])

    return (
        <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-4">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-md bg-primary">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback className="rounded-md bg-primary text-primary-foreground">AI</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">AI Agents</span>
                </Link>

                <div className="hidden md:block h-6 w-px bg-border mx-2"></div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-2 h-9">
                            <Avatar className="h-5 w-5 rounded-sm bg-primary/10">
                                <AvatarFallback className="rounded-sm text-primary text-xs">{activeTeam.icon}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{activeTeam.name}</span>
                            <Badge variant="outline" className="ml-1 font-normal text-xs">
                                {activeTeam.role}
                            </Badge>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                        <DropdownMenuLabel>Switch Team</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            {teams.map((team) => (
                                <DropdownMenuItem key={team.id} onClick={() => setActiveTeam(team)} className="cursor-pointer py-2">
                                    <div className="flex items-center gap-3 w-full">
                                        <Avatar className="h-7 w-7 rounded-md bg-primary/10">
                                            <AvatarFallback className="rounded-md text-primary text-xs">{team.icon}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{team.name}</span>
                                            <span className="text-xs text-muted-foreground">
                        {team.members} {team.members === 1 ? "member" : "members"}
                      </span>
                                        </div>
                                        {team.id === activeTeam.id && <div className="ml-auto h-2 w-2 rounded-full bg-primary"></div>}
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            <div className="flex items-center gap-3 w-full">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md border border-dashed">
                                    <Plus className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <span>Create New Team</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <div className="flex items-center gap-3 w-full">
                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
                                    <Users className="h-4 w-4" />
                                </div>
                                <span>Manage Teams</span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                    <Plus className="h-4 w-4" />
                    New Agent
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                {user.image ? (
                                    <AvatarImage src={user.image} alt={user.name || "User"} />
                                ) : (
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="flex flex-col space-y-1 p-2">
                            <p className="text-sm font-medium">{user.name || "User"}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer text-destructive focus:text-destructive"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

