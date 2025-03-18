import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Remove any "export const runtime = 'edge'" if present
// Do NOT use Edge Runtime with Prisma

export function middleware(request: NextRequest) {
    // Your middleware logic
    return NextResponse.next()
}