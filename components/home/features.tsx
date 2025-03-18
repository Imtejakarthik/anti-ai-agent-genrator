"use client"

import { motion } from "framer-motion"
import { Bot, Zap, Database, Globe, Code, Cpu, FileText, Layers } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Visual Builder",
    description:
        "Drag-and-drop interface to build AI agents without writing code. Connect nodes to create complex workflows.",
  },
  {
    icon: <Cpu className="h-6 w-6 text-primary" />,
    title: "AI Model Integration",
    description: "Seamlessly connect to leading AI models from OpenAI, Anthropic, Google, and more.",
  },
  {
    icon: <Database className="h-6 w-6 text-primary" />,
    title: "Knowledge Base",
    description:
        "Create agents with access to your custom data. Upload documents or connect to your existing databases.",
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: "API Access",
    description: "Connect your agents to external APIs and services to extend their capabilities.",
  },
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: "Custom Logic",
    description: "Add custom code nodes when you need more control over your agent's behavior.",
  },
  {
    icon: <Layers className="h-6 w-6 text-primary" />,
    title: "Templates & Presets",
    description: "Start with pre-built templates for common use cases and customize to your needs.",
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Analytics & Monitoring",
    description: "Track your agent's performance and user interactions with built-in analytics.",
  },
  {
    icon: <Bot className="h-6 w-6 text-primary" />,
    title: "Multi-Channel Deployment",
    description: "Deploy your agents to web, mobile, or embed them in your existing applications.",
  },
]

export default function Features() {
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

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Powerful Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build, deploy, and scale AI agents with our powerful platform
            </p>
          </motion.div>

          <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="mb-4 p-2 rounded-full bg-primary/10 w-fit">{feature.icon}</div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
  )
}

