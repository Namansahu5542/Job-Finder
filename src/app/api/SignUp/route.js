import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
    username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
    profileName: z.string().min(1).max(50),
    email: z.string().email(),
    password: z.string().min(8),
});

export async function POST(req) {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { username, profileName, email, password } = parsed.data;

    const existing = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] },
    });
    if (existing) {
        return NextResponse.json(
            { error: "Email or username already taken" },
            { status: 409 }
        );
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: { username, profileName, email, password: hashed },
    });

    return NextResponse.json({ success: true }, { status: 201 });
}