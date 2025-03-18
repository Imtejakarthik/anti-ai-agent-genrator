"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Bot,
    Home,
    MessageSquare,
    PieChart,
    Settings,
    CreditCard,
    Zap,
    BarChart3,
    Plus,
    ChevronDown,
    Workflow,
    Layers,
    Users,
    Database,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarHeader,
    SidebarFooter,
    SidebarMenuBadge,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function DashboardSidebar() {
    const pathname = usePathname()
    const [openProjects, setOpenProjects] = useState(true)

    const mainNavItems = [
        { href: "/dashboard", icon: Home, label: "Dashboard", badge: null },
        { href: "/dashboard/agents", icon: Bot, label: "Agents", badge: "3" },
        { href: "/dashboard/workflows", icon: Workflow, label: "Workflows", badge: null },
        { href: "/dashboard/conversations", icon: MessageSquare, label: "Conversations", badge: "12" },
        { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics", badge: null },
    ]

    const projectItems = [
        {
            name: "Customer Service",
            href: "/dashboard/projects/customer-service",
            icon: "CS",
            color: "bg-blue-500",
            agents: 2,
        },
        {
            name: "Sales Assistant",
            href: "/dashboard/projects/sales-assistant",
            icon: "SA",
            color: "bg-green-500",
            agents: 1,
        },
        {
            name: "Knowledge Base",
            href: "/dashboard/projects/knowledge-base",
            icon: "KB",
            color: "bg-purple-500",
            agents: 3,
        },
    ]

    const resourceNavItems = [
        { href: "/dashboard/team", icon: Users, label: "Team Members" },
        { href: "/dashboard/integrations", icon: Zap, label: "Integrations" },
        { href: "/dashboard/data-sources", icon: Database, label: "Data Sources" },
    ]

    const settingsNavItems = [
        { href: "/dashboard/settings", icon: Settings, label: "Settings" },
        { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
        { href: "/dashboard/usage", icon: PieChart, label: "Usage" },
    ]

    return (
        <Sidebar className="border-r border-border h-[calc(100vh-4rem)] fixed top-16 left-0 z-30 bg-background/95 backdrop-blur-sm">
            <SidebarHeader className="p-4">
                <Button variant="default" className="w-full justify-start gap-2 bg-primary/90 hover:bg-primary">
                    <Plus className="h-4 w-4" />
                    Create New Agent
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                                        <Link href={item.href} className="flex items-center gap-3 px-2">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    {item.badge && (
                                        <SidebarMenuBadge className="bg-primary/10 text-primary">{item.badge}</SidebarMenuBadge>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <Collapsible open={openProjects} onOpenChange={setOpenProjects} className="w-full">
                    <SidebarGroup>
                        <div className="flex items-center justify-between px-2">
                            <SidebarGroupLabel className="py-1.5">Projects</SidebarGroupLabel>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <ChevronDown
                                        className={cn(
                                            "h-4 w-4 text-muted-foreground transition-transform duration-200",
                                            openProjects ? "rotate-180" : "",
                                        )}
                                    />
                                    <span className="sr-only">Toggle projects</span>
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {projectItems.map((project) => (
                                        <SidebarMenuItem key={project.href}>
                                            <SidebarMenuButton asChild isActive={pathname === project.href} tooltip={project.name}>
                                                <Link href={project.href} className="flex items-center gap-3 px-2">
                                                    <Avatar className={cn("h-5 w-5 rounded-sm", project.color)}>
                                                        <AvatarFallback className="rounded-sm text-white text-xs">{project.icon}</AvatarFallback>
                                                    </Avatar>
                                                    <span>{project.name}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                            <SidebarMenuBadge className="bg-muted text-muted-foreground">{project.agents}</SidebarMenuBadge>
                                        </SidebarMenuItem>
                                    ))}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild tooltip="Create Project">
                                            <Link
                                                href="/dashboard/projects/new"
                                                className="flex items-center gap-3 px-2 text-muted-foreground hover:text-foreground"
                                            >
                                                <Layers className="h-4 w-4" />
                                                <span>New Project</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>

                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarGroupLabel className="px-2 py-1.5">Resources</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {resourceNavItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                                        <Link href={item.href} className="flex items-center gap-3 px-2">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarGroupLabel className="px-2 py-1.5">Settings</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {settingsNavItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                                        <Link href={item.href} className="flex items-center gap-3 px-2">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">
                <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                        <p>AI Agents Platform v1.0</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

