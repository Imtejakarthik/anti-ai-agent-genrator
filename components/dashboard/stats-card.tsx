import type React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
    title: string
    value: string
    description: string
    icon: React.ReactNode
    trend?: "up" | "down"
    trendValue?: string
    trendPositive?: boolean
}

export function StatsCard({
                              title,
                              value,
                              description,
                              icon,
                              trend,
                              trendValue,
                              trendPositive = false,
                          }: StatsCardProps) {
    return (
        <Card className="border-border hover:shadow-sm transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <CardDescription className="flex items-center text-xs mt-1">
                    {trend && (
                        <span className={cn("flex items-center mr-1", trendPositive ? "text-green-500" : "text-red-500")}>
              {trend === "up" ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                            {trendValue}
            </span>
                    )}
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    )
}

