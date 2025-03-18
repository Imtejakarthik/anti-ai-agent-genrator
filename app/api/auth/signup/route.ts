import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { hash } from "bcrypt"
import { signupSchema } from "@/lib/zodSchema"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const result = signupSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 })
        }

        const { name, email, password } = body
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
