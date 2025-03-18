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
    Workflow,
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

export function DashboardSidebar() {
    const pathname = usePathname()

    const mainNavItems = [
        { href: "/dashboard", icon: Home, label: "Dashboard", badge: null },
        { href: "/dashboard/agents", icon: Bot, label: "Agents", badge: "3" },
        { href: "/dashboard/workflows", icon: Workflow, label: "Workflows", badge: null },
        { href: "/dashboard/conversations", icon: MessageSquare, label: "Conversations", badge: "12" },
        { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics", badge: null },
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

