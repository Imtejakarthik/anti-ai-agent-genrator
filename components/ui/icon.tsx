import type React from "react"
import { Twitter, Github, Linkedin, Youtube, Mail, Bot, Menu, X, ChevronRight } from 'lucide-react'

export type IconName = "twitter" | "github" | "linkedin" | "youtube" | "mail" | "bot" | "menu" | "x" | "chevronRight"

interface IconProps {
  name: IconName
  className?: string
}

export function Icon({ name, className = "h-5 w-5" }: IconProps) {
  const icons: Record<IconName, React.ReactNode> = {
    twitter: <Twitter className={className} />,
    github: <Github className={className} />,
    linkedin: <Linkedin className={className} />,
    youtube: <Youtube className={className} />,
    mail: <Mail className={className} />,
    bot: <Bot className={className} />,
    menu: <Menu className={className} />,
    x: <X className={className} />,
    chevronRight: <ChevronRight className={className} />,
  }

  return icons[name] || null
}
