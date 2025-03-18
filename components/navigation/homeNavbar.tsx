"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Bot, Menu, ChevronRight, User, LogOut } from "lucide-react"
import { UserProfileDropdown } from "./user-profile-dropdown"

// Mock navigation data - replace with your actual data
const platformItems = [
  {
    title: "Visual Builder",
    description: "Drag-and-drop interface to build AI agents without code",
    href: "/platform/visual-builder",
  },
  {
    title: "AI Models",
    description: "Connect to leading AI models from OpenAI, Anthropic, and more",
    href: "/platform/ai-models",
  },
]

const solutionsItems = [
  {
    title: "Customer Support",
    description: "Build AI agents that handle customer inquiries 24/7",
    href: "/solutions/customer-support",
  },
  {
    title: "Content Creation",
    description: "Create AI assistants for generating marketing content",
    href: "/solutions/content-creation",
  },
]

const resourcesItems = [
  {
    title: "Documentation",
    description: "Detailed guides and API references",
    href: "/docs",
  },
  {
    title: "Blog",
    description: "Latest news and tutorials",
    href: "/blog",
  },
]

interface ListItemProps {
  className?: string
  title: string
  children: React.ReactNode
  href: string
}

function ListItem({ className, title, children, href }: ListItemProps) {
  return (
      <li>
        <NavigationMenuLink asChild>
          <a
              href={href}
              className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary border border-transparent hover:border-primary/20 hover:shadow-sm",
                  className,
              )}
          >
            <div className="text-sm font-medium leading-none flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-3 w-3 text-primary" />
              </div>
              {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
  )
}

export default function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated" && session?.user

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
      <header
          className={`sticky top-0 z-50 w-full transition-all duration-300 ${
              scrolled ? "bg-background/80 border-b border-border/50 backdrop-blur-md" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AgentBuilder</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-10">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-primary/10 data-[state=open]:bg-primary/10 rounded-md transition-all duration-200 data-[state=open]:shadow-sm">
                    Platform
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background/95 backdrop-blur-md rounded-xl border border-border/50 shadow-lg">
                      {[
                        {
                          title: "Visual Builder",
                          description: "Drag-and-drop interface to build AI agents without code",
                          href: "/platform/visual-builder",
                        },
                        {
                          title: "AI Models",
                          description: "Connect to leading AI models from OpenAI, Anthropic, and more",
                          href: "/platform/ai-models",
                        },
                        {
                          title: "Knowledge Base",
                          description: "Connect your documents and data sources",
                          href: "/platform/knowledge-base",
                        },
                        {
                          title: "Templates",
                          description: "Pre-built agent templates for common use cases",
                          href: "/platform/templates",
                        },
                        {
                          title: "Integrations",
                          description: "Connect with your favorite tools and services",
                          href: "/platform/integrations",
                        },
                        {
                          title: "Analytics",
                          description: "Track performance and usage metrics",
                          href: "/platform/analytics",
                        },
                      ].map((item) => (
                          <ListItem key={item.title} title={item.title} href={item.href}>
                            {item.description}
                          </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-primary/10 data-[state=open]:bg-primary/10 rounded-md transition-all duration-200 data-[state=open]:shadow-sm">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background/95 backdrop-blur-md rounded-xl border border-border/50 shadow-lg">
                      {[
                        {
                          title: "Customer Support",
                          description: "Build AI agents that handle customer inquiries 24/7",
                          href: "/solutions/customer-support",
                        },
                        {
                          title: "Content Creation",
                          description: "Create AI assistants for generating marketing content",
                          href: "/solutions/content-creation",
                        },
                        {
                          title: "Sales & Marketing",
                          description: "Automate lead qualification and follow-ups",
                          href: "/solutions/sales-marketing",
                        },
                        {
                          title: "HR & Recruiting",
                          description: "Streamline candidate screening and onboarding",
                          href: "/solutions/hr-recruiting",
                        },
                        {
                          title: "E-commerce",
                          description: "Personalized shopping assistants and recommendations",
                          href: "/solutions/ecommerce",
                        },
                        {
                          title: "Healthcare",
                          description: "Patient support and medical information assistants",
                          href: "/solutions/healthcare",
                        },
                      ].map((item) => (
                          <ListItem key={item.title} title={item.title} href={item.href}>
                            {item.description}
                          </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-primary/10 data-[state=open]:bg-primary/10 rounded-md transition-all duration-200 data-[state=open]:shadow-sm">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background/95 backdrop-blur-md rounded-xl border border-border/50 shadow-lg">
                      {[
                        {
                          title: "Documentation",
                          description: "Detailed guides and API references",
                          href: "/docs",
                        },
                        {
                          title: "Blog",
                          description: "Latest news and tutorials",
                          href: "/blog",
                        },
                        {
                          title: "Tutorials",
                          description: "Step-by-step guides to build your first agent",
                          href: "/tutorials",
                        },
                        {
                          title: "Case Studies",
                          description: "Real-world examples and success stories",
                          href: "/case-studies",
                        },
                        {
                          title: "Community",
                          description: "Join our forum and Discord server",
                          href: "/community",
                        },
                        {
                          title: "Webinars",
                          description: "Live demos and educational sessions",
                          href: "/webinars",
                        },
                      ].map((item) => (
                          <ListItem key={item.title} title={item.title} href={item.href}>
                            {item.description}
                          </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-transparent hover:bg-primary/10 text-foreground hover:text-primary",
                        )}
                    >
                      Docs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-transparent hover:bg-primary/10 text-foreground hover:text-primary",
                        )}
                    >
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons or User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link href="/dashboard">
                    <Button variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary">
                      Dashboard
                    </Button>
                  </Link>
                  {session?.user && <UserProfileDropdown user={session.user} />}
                </div>
            ) : (
                <>
                  <Link href="/login">
                    <Button
                        variant="outline"
                        className="w-full justify-center border-primary/20 hover:bg-primary/10 hover:text-primary"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90">
                      Sign up
                    </Button>
                  </Link>
                </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[350px] pr-0">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <span>AgentBuilder</span>
                </SheetTitle>
              </SheetHeader>
              <div className="py-6 overflow-y-auto h-[calc(100vh-80px)]">
                {isAuthenticated && session?.user && (
                    <div className="px-2 mb-6 pb-6 border-b border-border/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                          {session.user.image ? (
                              <Image
                                  src={session.user.image || "/placeholder.svg"}
                                  alt={session.user.name || "User"}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                              />
                          ) : (
                              <User className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{session.user.name || "User"}</div>
                          <div className="text-xs text-muted-foreground">{session.user.email || ""}</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Link
                            href="/account"
                            className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-primary/10 transition-colors"
                        >
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>Profile</span>
                        </Link>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-primary/10 transition-colors"
                        >
                          <Bot className="h-4 w-4 text-muted-foreground" />
                          <span>Dashboard</span>
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-primary/10 transition-colors w-full text-left text-red-500"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                )}

                <div className="space-y-4 px-2">
                  <div className="py-2">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Platform</h3>
                    <div className="space-y-1">
                      {platformItems.map((item) => (
                          <Link
                              key={item.title}
                              href={item.href}
                              className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-primary/10 transition-colors"
                          >
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                      ))}
                    </div>
                  </div>

                  <div className="py-2">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Solutions</h3>
                    <div className="space-y-1">
                      {solutionsItems.map((item) => (
                          <Link
                              key={item.title}
                              href={item.href}
                              className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-primary/10 transition-colors"
                          >
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                      ))}
                    </div>
                  </div>

                  <div className="py-2">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Resources</h3>
                    <div className="space-y-1">
                      {resourcesItems.map((item) => (
                          <Link
                              key={item.title}
                              href={item.href}
                              className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-primary/10 transition-colors"
                          >
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 py-2">
                    <Link
                        href="/docs"
                        className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-primary/10 transition-colors"
                    >
                      <div className="font-medium">Docs</div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                    <Link
                        href="/pricing"
                        className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-primary/10 transition-colors"
                    >
                      <div className="font-medium">Pricing</div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </div>
                </div>

                {!isAuthenticated && (
                    <div className="border-t border-border/50 mt-6 pt-6 px-2">
                      <div className="flex flex-col gap-2">
                        <Link href="/login">
                          <Button
                              variant="outline"
                              className="w-full justify-center border-primary/20 hover:bg-primary/10 hover:text-primary"
                          >
                            Log in
                          </Button>
                        </Link>
                        <Link href="/signup">
                          <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90">
                            Sign up
                          </Button>
                        </Link>
                      </div>
                    </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
  )
}

