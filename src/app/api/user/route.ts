import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
    console.log('Fetching users...')
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch users', errorLog: error },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    console.log('Creating user...')
    const body = await req.json()
    const { name, email } = body

    if (!name || !email) {
        return NextResponse.json(
            { error: 'Name and email are required' },
            { status: 400 }
        )
    }

    try {
        const user = await prisma.user.create({
            data: { name, email },
        })

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Email already exists', errorLog: error },
            { status: 409 }
        )
    }
}

export async function PUT(req: Request) {
    const data = await req.json();

    const user = await prisma.user.update({
        where: { id: data.id },
        data: {
            name: data.name,
            email: data.email,
            area: data.area,
        },
    });

    return NextResponse.json(user);
}
