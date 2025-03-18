"use client"

import { Check, Copy, FileCode, Globe, Info, Lightbulb, Link2, Puzzle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EmbedDocumentationProps {
  agentId: string
  agentName: string
}

export function EmbedDocumentation({ agentId, agentName }: EmbedDocumentationProps) {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null)

  const handleCopyCode = (code: string, snippetId: string) => {
    navigator.clipboard.writeText(code)
    setCopiedSnippet(snippetId)
    setTimeout(() => setCopiedSnippet(null), 2000)
  }

  const basicEmbedCode = `<!-- AI Chat Widget -->
<script>
  (function(w, d, s, o) {
    var j = d.createElement(s);
    j.async = true;
    j.src = 'https://yourdomain.com/widget.js';
    j.dataset.agentId = '${agentId}';
    d.head.appendChild(j);
  })(window, document, 'script');
</script>
<!-- End AI Chat Widget -->`

  const customEmbedCode = `<!-- AI Chat Widget -->
<script>
  (function(w, d, s, o) {
    var j = d.createElement(s);
    j.async = true;
    j.src = 'https://yourdomain.com/widget.js';
    j.dataset.agentId = '${agentId}';
    j.dataset.position = 'right';
    j.dataset.color = '#0091ff';
    j.dataset.welcomeMessage = 'Hi there! How can I help you today?';
    j.dataset.placeholder = 'Type your message...';
    d.head.appendChild(j);
  })(window, document, 'script');
</script>
<!-- End AI Chat Widget -->`

  const inlineEmbedCode = `<div id="ai-chat-container" data-agent-id="${agentId}"></div>
<script src="https://yourdomain.com/inline-widget.js" async></script>`

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Embedding {agentName} on Your Website</h2>
        <p className="text-muted-foreground">
          Follow these steps to add your AI agent to your website. Choose the embedding method that works best for your
          needs.
        </p>
      </div>

      <Tabs defaultValue="basic">
        <TabsList className="mb-4">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <Puzzle className="h-4 w-4" />
            Basic Setup
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            Advanced Options
          </TabsTrigger>
          <TabsTrigger value="troubleshooting" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Troubleshooting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Step 1: Choose Your Embedding Method
              </CardTitle>
              <CardDescription>Select the embedding method that best fits your website and needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Link2 className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium">Floating Chat Widget</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    A chat bubble that appears in the corner of your website. Users can click to open the chat.
                  </p>
                  <div className="relative rounded bg-muted p-3 font-mono text-sm">
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words">{basicEmbedCode}</pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-2 top-2"
                      onClick={() => handleCopyCode(basicEmbedCode, "basic")}
                    >
                      {copiedSnippet === "basic" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <FileCode className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium">Inline Chat</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Embed the chat directly within a specific section of your webpage.
                  </p>
                  <div className="relative rounded bg-muted p-3 font-mono text-sm">
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words">{inlineEmbedCode}</pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-2 top-2"
                      onClick={() => handleCopyCode(inlineEmbedCode, "inline")}
                    >
                      {copiedSnippet === "inline" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                Step 2: Add the Code to Your Website
              </CardTitle>
              <CardDescription>Place the embed code in the appropriate location in your website's HTML</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">For the floating chat widget:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Copy the embed code from above</li>
                  <li>Open your website's HTML file or template</li>
                  <li>
                    Paste the code just before the closing <code className="bg-muted px-1 rounded">&lt;/body&gt;</code>{" "}
                    tag
                  </li>
                  <li>Save the file and upload it to your web server</li>
                </ol>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">For the inline chat:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Copy the embed code from above</li>
                  <li>Open your website's HTML file or template</li>
                  <li>Paste the code where you want the chat to appear in your page</li>
                  <li>Save the file and upload it to your web server</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Step 3: Test Your Integration
              </CardTitle>
              <CardDescription>Verify that the chat widget is working correctly on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4">
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Visit your website in a web browser</li>
                  <li>For the floating widget, look for the chat bubble in the corner of your page</li>
                  <li>For the inline chat, check the section where you placed the code</li>
                  <li>Click on the chat icon or try sending a message</li>
                  <li>Verify that the chat responds correctly</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customization Options</CardTitle>
              <CardDescription>Customize the appearance and behavior of your chat widget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative rounded bg-muted p-3 font-mono text-sm">
                <pre className="overflow-x-auto whitespace-pre-wrap break-words">{customEmbedCode}</pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopyCode(customEmbedCode, "custom")}
                >
                  {copiedSnippet === "custom" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Available Configuration Options:</h3>
                <div className="grid gap-4">
                  <div className="rounded-lg border p-3">
                    <h4 className="font-medium text-sm">Position</h4>
                    <p className="text-sm text-muted-foreground">
                      <code className="bg-muted px-1 rounded">data-position</code>: Set to{" "}
                      <code className="bg-muted px-1 rounded">"left"</code> or{" "}
                      <code className="bg-muted px-1 rounded">"right"</code> to control which corner the chat appears
                      in.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h4 className="font-medium text-sm">Color</h4>
                    <p className="text-sm text-muted-foreground">
                      <code className="bg-muted px-1 rounded">data-color</code>: Set to any hex color code (e.g.,{" "}
                      <code className="bg-muted px-1 rounded">"#0091ff"</code>) to customize the primary color.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h4 className="font-medium text-sm">Welcome Message</h4>
                    <p className="text-sm text-muted-foreground">
                      <code className="bg-muted px-1 rounded">data-welcome-message</code>: Customize the initial message
                      shown to users.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h4 className="font-medium text-sm">Placeholder Text</h4>
                    <p className="text-sm text-muted-foreground">
                      <code className="bg-muted px-1 rounded">data-placeholder</code>: Customize the placeholder text in
                      the input field.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>JavaScript API</CardTitle>
              <CardDescription>Programmatically control the chat widget using JavaScript</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You can interact with the chat widget using JavaScript after it's loaded:
                </p>
                <div className="relative rounded bg-muted p-3 font-mono text-sm">
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words">{`// Open the chat widget
window.AIChat.open();

// Close the chat widget
window.AIChat.close();

// Send a message programmatically
window.AIChat.sendMessage("Hello, I have a question");

// Listen for events
window.AIChat.on('ready', function() {
  console.log('Chat widget is ready');
});

window.AIChat.on('message', function(message) {
  console.log('New message:', message);
});`}</pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute right-2 top-2"
                    onClick={() =>
                      handleCopyCode(
                        `// Open the chat widget
window.AIChat.open();

// Close the chat widget
window.AIChat.close();

// Send a message programmatically
window.AIChat.sendMessage("Hello, I have a question");

// Listen for events
window.AIChat.on('ready', function() {
  console.log('Chat widget is ready');
});

window.AIChat.on('message', function(message) {
  console.log('New message:', message);
});`,
                        "api",
                      )
                    }
                  >
                    {copiedSnippet === "api" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshooting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Issues</CardTitle>
              <CardDescription>Solutions to common problems when embedding the chat widget</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Widget doesn't appear</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Verify that the script is properly added to your HTML</li>
                    <li>Check your browser console for any JavaScript errors</li>
                    <li>Ensure you're using the correct agent ID</li>
                    <li>Check if any content blockers are preventing the widget from loading</li>
                  </ul>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Widget appears but doesn't respond</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Verify that your agent is online and properly configured</li>
                    <li>Check your network connection</li>
                    <li>Look for any CORS errors in the browser console</li>
                  </ul>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Styling conflicts</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>If your website's CSS is affecting the widget, you may need to adjust your CSS specificity</li>
                    <li>Try using the inline embed option which has more isolated styling</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Help</CardTitle>
              <CardDescription>Additional resources if you need further assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  If you're still having trouble with your chat widget integration, here are some resources that can
                  help:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Documentation</h3>
                    <p className="text-sm text-muted-foreground">
                      Visit our comprehensive documentation for detailed guides and examples.
                    </p>
                    <Button variant="outline" className="mt-2" size="sm">
                      View Documentation
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Contact our support team for personalized assistance with your integration.
                    </p>
                    <Button variant="outline" className="mt-2" size="sm">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

