import type React from "react"
import { redirect } from "next/navigation"
import { DashboardNavbar } from "@/components/navigation/dashboardNavbar"
import { DashboardSidebar } from "@/components/navigation/sidebar"
import { auth } from "@/auth"
import { SidebarProvider } from "@/components/ui/sidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()

    // Double-check authentication in case middleware fails
    if (!session) {
        redirect("/login")
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen flex-col bg-background">
                <DashboardNavbar user={session.user} />
                <div className="flex flex-1 pt-16"> {/* Add pt-16 to account for fixed navbar height */}
                    <DashboardSidebar />
                    <main className="flex-1 overflow-auto">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}
