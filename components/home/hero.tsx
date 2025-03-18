import { Button } from "@/components/ui/button"
import { Bot, ArrowRight, Sparkles, Zap, Database, Code } from "lucide-react"
import Link from "next/link"

export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Community Banner */}
            <div className="relative w-full border-b border-border/40 bg-background/30 backdrop-blur-sm z-10">
                <div className="container mx-auto py-3">
                    <p className="text-center text-sm text-muted-foreground">
                        Community support, daily live office hours, and thousands of builders — all on{" "}
                        <Link href="/" className="text-primary hover:underline">
                            Discord
                        </Link>
                    </p>
                </div>
            </div>

            <div className="relative overflow-hidden py-20 md:py-32 w-full">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 z-0" />

                {/* Background grid */}
                <div
                    className="absolute inset-0 opacity-10 z-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(hsl(var(--primary) / 0.2) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary) / 0.2) 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                    }}
                />

                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse z-0" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse z-0" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Introducing AgentBuilder 2.0</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Build AI Agents Without Code</h1>

                        <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
                            Create, deploy, and scale AI agents powered by the latest LLMs. Connect to your data and integrate with
                            your existing tools.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-16">
                            <Link href="/signup">
                                <Button size="lg" className="gap-2 px-8">
                                    Get Started <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="gap-2 px-8">
                                Book a Demo <Bot className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Feature highlights */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mb-16">
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                    <Bot className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-medium">Visual Builder</h3>
                                <p className="text-sm text-muted-foreground">No-code interface</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                    <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-medium">Fast Deployment</h3>
                                <p className="text-sm text-muted-foreground">Live in minutes</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                    <Database className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-medium">Knowledge Base</h3>
                                <p className="text-sm text-muted-foreground">Connect your data</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                    <Code className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-medium">API Access</h3>
                                <p className="text-sm text-muted-foreground">Extend functionality</p>
                            </div>
                        </div>

                        {/* Lab visualization */}
                        <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-border/50 shadow-2xl">
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-10 pointer-events-none h-[100%]"
                                style={{ height: "100%" }}
                            />

                            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-t-xl border-b border-border/50 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="text-xs text-muted-foreground ml-2">AgentBuilder Lab</div>
                            </div>

                            <div className="relative bg-black/80 min-h-[500px] p-6 flex flex-col">
                                {/* Custom lab interface content */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                                    {/* Left panel - Agent Configuration */}
                                    <div className="bg-primary/5 backdrop-blur-md rounded-lg p-4 border border-primary/20">
                                        <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                                            <Bot className="h-4 w-4 text-primary" /> Agent Configuration
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs text-muted-foreground">Agent Name</label>
                                                <div className="h-8 bg-primary/10 rounded-md w-full" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-muted-foreground">Model</label>
                                                <div className="h-8 bg-primary/10 rounded-md w-full" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-muted-foreground">Knowledge Base</label>
                                                <div className="h-8 bg-primary/10 rounded-md w-full" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-muted-foreground">Tools</label>
                                                <div className="flex gap-2 flex-wrap">
                                                    <div className="px-2 py-1 bg-primary/20 rounded-md text-xs flex items-center gap-1">
                                                        <Database className="h-3 w-3" /> Database
                                                    </div>
                                                    <div className="px-2 py-1 bg-primary/20 rounded-md text-xs flex items-center gap-1">
                                                        <Code className="h-3 w-3" /> API
                                                    </div>
                                                    <div className="px-2 py-1 bg-primary/20 rounded-md text-xs flex items-center gap-1">
                                                        <Zap className="h-3 w-3" /> Functions
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle panel - Workflow */}
                                    <div className="bg-primary/5 backdrop-blur-md rounded-lg p-4 border border-primary/20">
                                        <h3 className="text-sm font-medium mb-4">Conversation Flow</h3>
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-full h-16 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                                                <span className="text-xs">Start</span>
                                            </div>
                                            <div className="h-8 w-px bg-primary/20" />
                                            <div className="w-full h-24 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                                                <span className="text-xs">Process User Input</span>
                                            </div>
                                            <div className="h-8 w-px bg-primary/20" />
                                            <div className="w-full h-24 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                                                <span className="text-xs">Generate Response</span>
                                            </div>
                                            <div className="h-8 w-px bg-primary/20" />
                                            <div className="w-full h-16 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                                                <span className="text-xs">End</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right panel - Agent Preview */}
                                    <div className="bg-primary/5 backdrop-blur-md rounded-lg p-4 border border-primary/20">
                                        <h3 className="text-sm font-medium mb-4">Agent Preview</h3>
                                        <div className="bg-background/40 backdrop-blur-md rounded-lg p-4 h-[calc(100%-2rem)] flex flex-col">
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-start gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                                        <Bot className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="bg-primary/10 rounded-lg p-2 text-xs">
                                                        Hello! I&#39;m your custom AI assistant. How can I help you today?
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2 justify-end">
                                                    <div className="bg-primary/20 rounded-lg p-2 text-xs">
                                                        I need help with setting up a knowledge base for my project.
                                                    </div>
                                                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center flex-shrink-0 border border-primary/20">
                                                        <span className="text-xs">You</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                                        <Bot className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="bg-primary/10 rounded-lg p-2 text-xs">
                                                        I&#39;d be happy to help you set up a knowledge base. You can upload documents, connect to
                                                        databases, or integrate with APIs. What type of data would you like to include?
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex gap-2">
                                                <div className="flex-1 h-8 bg-background/60 rounded-md border border-primary/10" />
                                                <Button size="sm" variant="secondary" className="h-8 px-2">
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

