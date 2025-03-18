"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { HeadphonesIcon, ShoppingCart, FileText, Brain } from "lucide-react"
import Image from "next/image"
import {contentCreation, customerCare, eCommerce} from "@/public/images";

export default function UseCases() {
  const [activeTab, setActiveTab] = useState("customer-support")

  return (
      <section className="py-20 relative">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid opacity-20"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Build Agents for Any Use Case</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From customer support to content creation, AgentBuilder powers AI solutions across industries
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Custom Tabs */}
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
              <div className="inline-flex bg-card/50 rounded-lg p-1">
                <button
                    onClick={() => setActiveTab("customer-support")}
                    className={`flex flex-col items-center gap-2 py-4 px-6 rounded-md transition-colors ${
                        activeTab === "customer-support"
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-primary/10"
                    }`}
                >
                  <HeadphonesIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Customer Support</span>
                  <span className="sm:hidden">Support</span>
                </button>
                <button
                    onClick={() => setActiveTab("e-commerce")}
                    className={`flex flex-col items-center gap-2 py-4 px-6 rounded-md transition-colors ${
                        activeTab === "e-commerce"
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-primary/10"
                    }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="hidden sm:inline">E-Commerce</span>
                  <span className="sm:hidden">Shop</span>
                </button>
                <button
                    onClick={() => setActiveTab("content")}
                    className={`flex flex-col items-center gap-2 py-4 px-6 rounded-md transition-colors ${
                        activeTab === "content" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-primary/10"
                    }`}
                >
                  <FileText className="h-5 w-5" />
                  <span className="hidden sm:inline">Content Creation</span>
                  <span className="sm:hidden">Content</span>
                </button>
                <button
                    onClick={() => setActiveTab("research")}
                    className={`flex flex-col items-center gap-2 py-4 px-6 rounded-md transition-colors ${
                        activeTab === "research"
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-primary/10"
                    }`}
                >
                  <Brain className="h-5 w-5" />
                  <span>Research</span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {activeTab === "customer-support" && (
                  <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 md:p-8">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h3 className="text-2xl font-bold mb-4">24/7 Customer Support Agents</h3>
                          <p className="text-muted-foreground mb-4">
                            Build AI agents that handle customer inquiries around the clock, reducing wait times and
                            improving satisfaction.
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Answer common questions instantly</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Escalate complex issues to human agents</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Integrate with your existing help desk</span>
                            </li>
                          </ul>
                        </div>
                        <div className="rounded-lg overflow-hidden border border-border/50">
                          <Image
                              src={customerCare}
                              alt="Customer Support Agent Interface"
                              width={400}
                              height={300}
                              className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              )}

              {activeTab === "e-commerce" && (
                  <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 md:p-8">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h3 className="text-2xl font-bold mb-4">Shopping Assistants</h3>
                          <p className="text-muted-foreground mb-4">
                            Create AI shopping assistants that help customers find products, answer questions, and make
                            recommendations.
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Personalized product recommendations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Answer product-specific questions</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Guide customers through checkout</span>
                            </li>
                          </ul>
                        </div>
                        <div className="rounded-lg overflow-hidden border border-border/50">
                          <Image
                              src={eCommerce}
                              alt="E-Commerce Assistant Interface"
                              width={400}
                              height={300}
                              className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              )}

              {activeTab === "content" && (
                  <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 md:p-8">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h3 className="text-2xl font-bold mb-4">Content Creation Assistants</h3>
                          <p className="text-muted-foreground mb-4">
                            Build AI agents that help create, edit, and optimize content for your marketing, blog, or social
                            media.
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Generate blog posts and articles</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Create social media content</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Edit and optimize existing content</span>
                            </li>
                          </ul>
                        </div>
                        <div className="rounded-lg overflow-hidden border border-border/50">
                          <Image
                              src={contentCreation}
                              alt="Content Creation Assistant Interface"
                              width={100}
                              height={50}
                              className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              )}

              {activeTab === "research" && (
                  <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 md:p-8">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h3 className="text-2xl font-bold mb-4">Research Assistants</h3>
                          <p className="text-muted-foreground mb-4">
                            Create AI agents that help with research, data analysis, and knowledge management.
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Summarize research papers and articles</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Extract insights from large datasets</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span>Answer questions based on your knowledge base</span>
                            </li>
                          </ul>
                        </div>
                        <div className="rounded-lg overflow-hidden border border-border/50">
                          <Image
                              src="/placeholder.svg?height=300&width=400&text=Research+Assistant+Interface"
                              alt="Research Assistant Interface"
                              width={400}
                              height={300}
                              className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              )}
            </div>
          </div>
        </div>
      </section>
  )
}

