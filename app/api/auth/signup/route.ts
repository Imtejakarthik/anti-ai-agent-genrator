import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { hash } from "bcrypt"

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
        }

        const hashedPassword = await hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return NextResponse.json(
            {
                success: true,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 201 },
        )
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
    }
}

