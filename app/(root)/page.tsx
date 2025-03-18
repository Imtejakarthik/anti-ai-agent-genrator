import Hero from "@/components/home/hero"
import Features from "@/components/home/features"
import UseCases from "@/components/home/use-cases"
import Testimonials from "@/components/home/testimonials"
import Pricing from "@/components/home/pricing"
import Cta from "@/components/home/cta"


export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground dark items-center">
            <main className="flex-1 w-full">
                <Hero />
                <Features />
                <UseCases />
                <Testimonials />
                <Pricing />
                <Cta />
            </main>
        </div>
    )
}


