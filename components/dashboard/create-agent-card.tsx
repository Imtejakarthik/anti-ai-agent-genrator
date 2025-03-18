import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function CreateAgentCard() {
    return (
        <Link href="/dashboard/agents/new">
            <Card className="flex h-full cursor-pointer items-center justify-center border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors duration-200 hover:border-muted-foreground/30">
                <CardContent className="flex flex-col items-center justify-center py-8">
                    <div className="mb-4 rounded-full bg-primary/10 p-3">
                        <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-center font-medium">Create Agent</h3>
                    <p className="mt-1 text-center text-sm text-muted-foreground">Build a custom AI agent for your needs</p>
                </CardContent>
            </Card>
        </Link>
    )
}

