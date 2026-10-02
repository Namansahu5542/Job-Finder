import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import dbConnect from "@/lib/db";
import UserData from "@/models/User_Credentials_m2";

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
  const normalizedEmail = email.toLowerCase();

  await dbConnect();

  const existing = await UserData.findOne({
    $or: [{ email: normalizedEmail }, { Username: username }],
  });
  if (existing) {
    return NextResponse.json(
      { error: "Email or username already taken" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await UserData.create({
      Username: username,
      ProfileName: profileName,
      email: normalizedEmail,
      Password: hashedPassword,
    });
  } catch (e) {
    if (e.code === 11000) {
      return NextResponse.json(
        { error: "Email or username already taken" },
        { status: 409 }
      );
    }
    throw e;
  }

  return NextResponse.json({ success: true }, { status: 201 });
}