-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconText" TEXT,
    "color" TEXT NOT NULL DEFAULT 'bg-blue-500',
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "model" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 0.7,
    "maxTokens" INTEGER NOT NULL DEFAULT 2000,
    "webSearch" BOOLEAN NOT NULL DEFAULT false,
    "codeGeneration" BOOLEAN NOT NULL DEFAULT false,
    "dataAnalysis" BOOLEAN NOT NULL DEFAULT false,
    "imageGeneration" BOOLEAN NOT NULL DEFAULT false,
    "knowledgeBase" TEXT NOT NULL DEFAULT 'none',
    "websiteUrl" TEXT,
    "apiEndpoint" TEXT,
    "systemPrompt" TEXT NOT NULL DEFAULT 'You are a helpful AI assistant that provides accurate and concise information.',
    "greeting" TEXT NOT NULL DEFAULT 'Hello! How can I help you today?',
    "contextWindow" INTEGER NOT NULL DEFAULT 5,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    "userCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastDeployed" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Agent_userId_idx" ON "Agent"("userId");

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
