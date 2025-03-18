import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link";

export default function Cta() {
    return (
        <section className="py-10 relative mb-6">
            {/* Background effects */}
            <div className="absolute inset-0 bg-glow"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-5xl mx-auto border border-primary/40 rounded-2xl p-8 md:p-12 text-center bg-card/50 backdrop-blur-sm">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-violet-400">Ready to Build Your AI Agent?</span>
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of creators building the next generation of AI applications with our AgentBuilder platform.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/signup">
                            <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md">
                                Get started for free <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-border hover:bg-primary/10 hover:text-primary rounded-md"
                        >
                            Schedule a demo
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

