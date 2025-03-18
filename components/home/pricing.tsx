import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

const plans = [
  {
    name: "Free",
    description: "For individuals and small projects",
    price: "$0",
    period: "forever",
    features: ["1 AI agent", "100 messages per month", "Basic node library", "Community support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For professionals and growing teams",
    price: "$29",
    period: "per month",
    features: [
      "10 AI agents",
      "10,000 messages per month",
      "Full node library",
      "Advanced AI models",
      "Priority support",
      "Custom branding",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced needs",
    price: "Custom",
    period: "",
    features: [
      "Unlimited AI agents",
      "Unlimited messages",
      "Custom node development",
      "Dedicated account manager",
      "SLA guarantees",
      "On-premise deployment options",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function Pricing() {
  return (
      <section className="py-20 relative" id="pricing">
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/80 via-primary to-primary/80">
              Simple, Transparent Pricing
            </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that&#39;s right for your AI agents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
                <div key={index} className={`relative ${plan.popular ? "mt-0 md:-mt-4" : ""}`}>
                  {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-md -mt-4 mr-4 z-20">
                        Most Popular
                      </div>
                  )}
                  <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                          className={`w-full ${
                              plan.popular
                                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                  : "border-border hover:bg-primary/10 hover:text-primary"
                          }`}
                          variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
            ))}
          </div>
        </div>
      </section>
  )
}

