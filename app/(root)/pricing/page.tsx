"use client"

import { useState } from "react"
import {
    Check,
    X,
    Zap,
    Shield,
    Clock,
    Users,
    Database,
    Code,
    Server,
    Sparkles,
    ArrowRight,
    Building,
    Briefcase,
    CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

// Define feature categories
const featureCategories = [
    { id: "agents", name: "AI Agents", icon: <Users className="h-4 w-4" /> },
    { id: "messages", name: "Messages", icon: <Zap className="h-4 w-4" /> },
    { id: "nodes", name: "Node Library", icon: <Code className="h-4 w-4" /> },
    { id: "models", name: "AI Models", icon: <Sparkles className="h-4 w-4" /> },
    { id: "support", name: "Support", icon: <Shield className="h-4 w-4" /> },
    { id: "deployment", name: "Deployment", icon: <Server className="h-4 w-4" /> },
    { id: "data", name: "Data & Storage", icon: <Database className="h-4 w-4" /> },
]

// Define plans with detailed features
const plans = [
    {
        id: "free",
        name: "Free",
        description: "For individuals and small projects",
        price: { monthly: "$0", annual: "$0" },
        period: "forever",
        features: {
            agents: { value: "1 AI agent", included: true },
            messages: { value: "100 messages per month", included: true },
            nodes: { value: "Basic node library (20+ nodes)", included: true },
            models: { value: "GPT-3.5 access", included: true },
            support: { value: "Community support", included: true },
            deployment: { value: "Shared cloud hosting", included: true },
            data: { value: "100MB storage", included: true },
            analytics: { value: "Basic analytics", included: true },
            integrations: { value: "3 integrations", included: true },
            customization: { value: "Limited branding options", included: false },
            team: { value: "1 team member", included: true },
            sla: { value: "No SLA", included: false },
        },
        cta: "Get Started",
        popular: false,
        badge: "Free Forever",
        badgeColor: "bg-blue-500",
    },
    {
        id: "pro",
        name: "Pro",
        description: "For professionals and growing teams",
        price: { monthly: "$29", annual: "$24" },
        period: "per seat/month",
        features: {
            agents: { value: "10 AI agents", included: true },
            messages: { value: "10,000 messages per month", included: true },
            nodes: { value: "Full node library (50+ nodes)", included: true },
            models: { value: "GPT-4o access", included: true },
            support: { value: "Priority email support", included: true },
            deployment: { value: "Dedicated cloud hosting", included: true },
            data: { value: "10GB storage", included: true },
            analytics: { value: "Advanced analytics & reporting", included: true },
            integrations: { value: "Unlimited integrations", included: true },
            customization: { value: "Custom branding & white label", included: true },
            team: { value: "5 team members", included: true },
            sla: { value: "99.9% uptime SLA", included: true },
        },
        cta: "Start Free Trial",
        popular: true,
        badge: "Most Popular",
        badgeColor: "bg-primary",
        savings: "Save 17%",
    },
    {
        id: "business",
        name: "Business",
        description: "For teams with advanced needs",
        price: { monthly: "$79", annual: "$65" },
        period: "per seat/month",
        features: {
            agents: { value: "50 AI agents", included: true },
            messages: { value: "100,000 messages per month", included: true },
            nodes: { value: "Full node library + priority access to new nodes", included: true },
            models: { value: "All AI models + fine-tuning", included: true },
            support: { value: "Dedicated support manager", included: true },
            deployment: { value: "Priority cloud hosting", included: true },
            data: { value: "100GB storage", included: true },
            analytics: { value: "Custom analytics & dashboards", included: true },
            integrations: { value: "Unlimited integrations + API", included: true },
            customization: { value: "Advanced customization & white label", included: true },
            team: { value: "20 team members", included: true },
            sla: { value: "99.99% uptime SLA", included: true },
        },
        cta: "Start Free Trial",
        popular: false,
        badge: "Best Value",
        badgeColor: "bg-violet-600",
        savings: "Save 18%",
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "For organizations with enterprise requirements",
        price: { monthly: "Custom", annual: "Custom" },
        period: "",
        features: {
            agents: { value: "Unlimited AI agents", included: true },
            messages: { value: "Unlimited messages", included: true },
            nodes: { value: "Custom node development", included: true },
            models: { value: "Custom AI model development", included: true },
            support: { value: "24/7 dedicated support", included: true },
            deployment: { value: "On-premise or private cloud", included: true },
            data: { value: "Unlimited storage", included: true },
            analytics: { value: "Enterprise reporting & BI integration", included: true },
            integrations: { value: "Custom integrations & development", included: true },
            customization: { value: "Fully customizable solution", included: true },
            team: { value: "Unlimited team members", included: true },
            sla: { value: "Custom SLA with financial guarantees", included: true },
        },
        cta: "Contact Sales",
        popular: false,
    },
]

// FAQ items
const faqItems = [
    {
        question: "How does the free plan work?",
        answer:
            "Our free plan gives you access to essential features to build and deploy one AI agent with up to 100 messages per month. It's perfect for individuals, small projects, or those who want to try out our platform before committing to a paid plan.",
    },
    {
        question: "Can I upgrade or downgrade my plan at any time?",
        answer:
            "Yes, you can upgrade your plan at any time and the new features will be immediately available. When downgrading, the changes will take effect at the end of your current billing cycle. Your data will be preserved when switching between plans.",
    },
    {
        question: "What happens if I exceed my monthly message limit?",
        answer:
            "If you reach your monthly message limit, you'll have the option to purchase additional message packs or upgrade to a higher tier plan. We'll notify you when you're approaching your limit so you can make an informed decision.",
    },
    {
        question: "Do you offer discounts for non-profits or educational institutions?",
        answer:
            "Yes, we offer special pricing for qualified non-profit organizations, educational institutions, and open-source projects. Please contact our sales team to learn more about our discount programs.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfers for annual Enterprise plans. All payments are processed securely through our payment providers.",
    },
    {
        question: "Is there a long-term commitment?",
        answer:
            "No long-term commitment is required for our monthly plans. Annual plans are billed yearly and offer a significant discount compared to monthly billing. Enterprise plans can be customized to meet your specific needs and contract requirements.",
    },
]

// Testimonials
const testimonials = [
    {
        quote:
            "We've been able to automate our customer support with AI agents that actually understand our business. The ROI has been incredible.",
        author: "Sarah Johnson",
        title: "CTO, TechSolutions Inc.",
        avatar: "/placeholder.svg?height=48&width=48",
    },
    {
        quote:
            "The platform's flexibility allowed us to create specialized agents for different departments. Our team productivity increased by 40%.",
        author: "Michael Chen",
        title: "Head of Innovation, Global Enterprises",
        avatar: "/placeholder.svg?height=48&width=48",
    },
    {
        quote:
            "The enterprise plan gave us the security and customization we needed to deploy AI agents across our organization.",
        author: "Emma Rodriguez",
        title: "VP of Operations, FinTech Leaders",
        avatar: "/placeholder.svg?height=48&width=48",
    },
]

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState("monthly")

    return (
        <div className="bg-gradient-to-b from-background to-background/80 min-h-screen">
            {/* Hero section */}
            <section className="pt-20 pb-10 relative overflow-hidden">
                {/* Background elements */}
                <div
                    className="absolute inset-0 opacity-10 z-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(hsl(var(--primary) / 0.2) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary) / 0.2) 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                    }}
                />
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse z-0" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse z-0" />

                <div className="container px-4 mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <Badge variant="outline" className="mb-4 px-3 py-1 border-primary/20 bg-primary/5">
                            <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" />
                            <span>Pricing</span>
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/80 via-primary to-primary/80">
                Choose the Perfect Plan for Your AI Agents
              </span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Scale your AI capabilities with flexible plans designed for individuals, teams, and enterprises. Pay only
                            for what you need and upgrade as you grow.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing section */}
            <section className="py-10 relative z-10">
                <div className="container px-4 mx-auto">
                    {/* Billing toggle */}
                    <div className="flex justify-center mb-10">
                        <Tabs defaultValue="monthly" className="w-full max-w-md" onValueChange={setBillingCycle}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                                <TabsTrigger value="annual">
                                    Annual
                                    <Badge variant="outline" className="ml-2 bg-primary/10 border-primary/20 text-xs">
                                        Save up to 18%
                                    </Badge>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Pricing cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {plans.map((plan) => (
                            <div key={plan.id} className={`relative ${plan.popular ? "mt-0 lg:-mt-4" : ""}`}>
                                {plan.badge && (
                                    <div
                                        className={`absolute top-0 right-0 ${plan.badgeColor} text-white text-xs font-medium px-3 py-1 rounded-md -mt-4 mr-4 z-20`}
                                    >
                                        {plan.badge}
                                    </div>
                                )}
                                <Card
                                    className={`h-full border ${plan.popular ? "border-primary/50" : "border-border/50"} bg-card/50 backdrop-blur-sm ${plan.popular ? "shadow-lg shadow-primary/10" : ""}`}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            {plan.name}
                                            {plan.id === "enterprise" && <Building className="ml-2 h-5 w-5 text-muted-foreground" />}
                                        </CardTitle>
                                        <CardDescription>{plan.description}</CardDescription>
                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-baseline">
                        <span className="text-3xl font-bold">
                          {billingCycle === "monthly" ? plan.price.monthly : plan.price.annual}
                        </span>
                                                {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                                            </div>
                                            {plan.savings && billingCycle === "annual" && (
                                                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 text-xs">
                                                    {plan.savings} with annual billing
                                                </Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-medium text-muted-foreground">Key Features</h4>
                                            <ul className="space-y-3">
                                                {Object.entries(plan.features)
                                                    .slice(0, 6)
                                                    .map(([key, feature]) => (
                                                        <li key={key} className="flex items-start gap-2 text-sm">
                                                            {feature.included ? (
                                                                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                            ) : (
                                                                <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                                            )}
                                                            <span className={!feature.included ? "text-muted-foreground" : ""}>{feature.value}</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                            {Object.keys(plan.features).length > 6 && (
                                                <Button variant="link" className="p-0 h-auto text-xs text-primary" asChild>
                                                    <Link href="#comparison">
                                                        See all features <ArrowRight className="ml-1 h-3 w-3" />
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            className={`w-full ${
                                                plan.popular
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                    : plan.id === "enterprise"
                                                        ? "border-primary/30 bg-primary/5 hover:bg-primary/10 text-foreground"
                                                        : "border-border hover:bg-primary/10 hover:text-primary"
                                            }`}
                                            variant={plan.popular ? "default" : "outline"}
                                            size="lg"
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

            {/* Feature comparison table */}
            <section className="py-16 relative z-10" id="comparison">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Compare All Features</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Detailed breakdown of what&#39;s included in each plan to help you make the right choice
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="min-w-[800px]">
                            <div className="grid grid-cols-5 gap-4 mb-4 pb-4 border-b border-border/50">
                                <div className="col-span-1 font-medium">Features</div>
                                {plans.map((plan) => (
                                    <div
                                        key={plan.id}
                                        className={`col-span-1 text-center font-medium ${plan.popular ? "text-primary" : ""}`}
                                    >
                                        {plan.name}
                                    </div>
                                ))}
                            </div>

                            {featureCategories.map((category) => (
                                <div key={category.id} className="mb-8">
                                    <div className="grid grid-cols-5 gap-4 mb-2 items-center">
                                        <div className="col-span-1 font-medium flex items-center gap-2 text-muted-foreground">
                                            {category.icon}
                                            {category.name}
                                        </div>
                                        {plans.map((plan) => (
                                            <div key={`${plan.id}-${category.id}-header`} className="col-span-1"></div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-5 gap-4 py-2 border-t border-border/30 items-center">
                                        <div className="col-span-1 pl-6 text-sm">
                                            {category.id === "agents" && "AI Agents"}
                                            {category.id === "messages" && "Monthly Messages"}
                                            {category.id === "nodes" && "Node Library"}
                                            {category.id === "models" && "AI Models"}
                                            {category.id === "support" && "Support Level"}
                                            {category.id === "deployment" && "Deployment Options"}
                                            {category.id === "data" && "Storage"}
                                        </div>
                                        {plans.map((plan) => (
                                            <div key={`${plan.id}-${category.id}`} className="col-span-1 text-center text-sm">
                                                {plan.features[category.id]?.value || "-"}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Additional features */}
                            <div className="mb-8">
                                <div className="grid grid-cols-5 gap-4 mb-2 items-center">
                                    <div className="col-span-1 font-medium flex items-center gap-2 text-muted-foreground">
                                        <Sparkles className="h-4 w-4" />
                                        Additional Features
                                    </div>
                                    {plans.map((plan) => (
                                        <div key={`${plan.id}-additional-header`} className="col-span-1"></div>
                                    ))}
                                </div>

                                {["analytics", "integrations", "customization", "team", "sla"].map((featureId) => (
                                    <div key={featureId} className="grid grid-cols-5 gap-4 py-2 border-t border-border/30 items-center">
                                        <div className="col-span-1 pl-6 text-sm">
                                            {featureId === "analytics" && "Analytics"}
                                            {featureId === "integrations" && "Integrations"}
                                            {featureId === "customization" && "Customization"}
                                            {featureId === "team" && "Team Members"}
                                            {featureId === "sla" && "SLA Guarantee"}
                                        </div>
                                        {plans.map((plan) => (
                                            <div key={`${plan.id}-${featureId}`} className="col-span-1 text-center text-sm">
                                                {plan.features[featureId]?.included ? (
                                                    <div className="flex justify-center">
                                                        {plan.features[featureId]?.value || <Check className="h-5 w-5 text-green-500" />}
                                                    </div>
                                                ) : (
                                                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-primary/5">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Trusted by Innovative Teams</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            See what our customers are saying about their experience with our AI agent platform
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                                <CardContent className="pt-6">
                                    <div className="mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Sparkles key={i} className="inline-block h-4 w-4 text-primary mr-1" />
                                        ))}
                                    </div>
                                    <p className="mb-6 italic text-muted-foreground">&#34;{testimonial.quote}&#34;</p>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 mr-3 overflow-hidden">
                                            <img
                                                src={testimonial.avatar || "/placeholder.svg"}
                                                alt={testimonial.author}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">{testimonial.author}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Find answers to common questions about our pricing and plans
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible className="w-full">
                            {faqItems.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                                    <AccordionContent>{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary/5 border-t border-primary/10">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Build Your AI Agents?</h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Start with our free plan or schedule a demo to see how our platform can transform your business
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="gap-2 px-8">
                                Get Started for Free <ArrowRight className="h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="gap-2 px-8">
                                Schedule a Demo <Briefcase className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="mt-6 text-sm text-muted-foreground">No credit card required for free plan. Cancel anytime.</p>
                    </div>
                </div>
            </section>

            {/* Enterprise Section */}
            <section className="py-16">
                <div className="container px-4 mx-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <Badge variant="outline" className="mb-4 px-3 py-1 border-primary/20 bg-primary/5">
                                    <Building className="h-3.5 w-3.5 mr-1 text-primary" />
                                    <span>Enterprise</span>
                                </Badge>
                                <h2 className="text-3xl font-bold mb-4">Custom Solutions for Enterprise Needs</h2>
                                <p className="text-muted-foreground mb-6">
                                    Our enterprise plan offers tailored solutions for organizations with complex requirements. Get custom
                                    AI models, dedicated support, and flexible deployment options.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>Custom AI model development and fine-tuning</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>On-premise deployment or private cloud options</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>24/7 dedicated support with assigned account manager</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>Custom SLA with financial guarantees</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>Advanced security features and compliance options</span>
                                    </li>
                                </ul>
                                <Button size="lg" className="gap-2">
                                    Contact Sales <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="bg-primary/5 rounded-xl p-8 border border-primary/10">
                                <h3 className="text-xl font-medium mb-6">Enterprise Features</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Shield className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Advanced Security</h4>
                                            <p className="text-sm text-muted-foreground">SOC 2, HIPAA, GDPR compliance options</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Server className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Flexible Deployment</h4>
                                            <p className="text-sm text-muted-foreground">On-premise, private cloud, or hybrid</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Code className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">Custom Development</h4>
                                            <p className="text-sm text-muted-foreground">Tailored AI models and integrations</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Clock className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">24/7 Support</h4>
                                            <p className="text-sm text-muted-foreground">Dedicated account management</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment options */}
            <section className="py-10 border-t border-border/30">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-medium mb-2">Secure Payment Options</h3>
                            <p className="text-sm text-muted-foreground">All transactions are encrypted and secure</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="h-8 w-12 bg-muted rounded opacity-70"></div>
                            <div className="h-8 w-12 bg-muted rounded opacity-70"></div>
                            <div className="h-8 w-12 bg-muted rounded opacity-70"></div>
                            <div className="h-8 w-12 bg-muted rounded opacity-70"></div>
                            <CreditCard className="h-6 w-6 text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

