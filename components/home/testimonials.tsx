"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
        "AgentBuilder has transformed how we handle customer support. Our AI agents now handle 80% of inquiries without human intervention.",
    author: "Sarah Johnson",
    title: "CTO, TechSupport Inc.",
    avatar: "SJ",
  },
  {
    quote:
        "Building AI agents used to take weeks of development time. With AgentBuilder, we can create and deploy new agents in hours.",
    author: "Michael Chen",
    title: "Product Manager, InnovateCorp",
    avatar: "MC",
  },
  {
    quote:
        "The visual builder is intuitive enough for non-technical team members to use, while powerful enough for our developers to extend.",
    author: "Emily Rodriguez",
    title: "Head of AI, FutureTech",
    avatar: "ER",
  },
  {
    quote:
        "We've integrated AgentBuilder agents across our entire customer journey, from initial inquiry to post-purchase support.",
    author: "David Kim",
    title: "CEO, RetailGenius",
    avatar: "DK",
  },
]

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
      <section className="py-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid opacity-20"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">What Our Customers Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of companies building AI agents with AgentBuilder
            </p>
          </motion.div>

          <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md hover:shadow-primary/10">
                    <CardContent className="p-6 h-full flex flex-col">
                      <blockquote className="text-lg mb-4 flex-grow">&#34;{testimonial.quote}&#34;</blockquote>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${testimonial.avatar}`} />
                          <AvatarFallback className="bg-primary/10 text-primary">{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
  )
}

