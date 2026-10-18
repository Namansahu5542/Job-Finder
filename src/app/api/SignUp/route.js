import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import dbConnect from "@/lib/db";
import UserData from "@/models/User_Credentials_m2";
import { initializeUserBoard } from "@/lib/init-user-board";

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

  const hashed = await bcrypt.hash(password, 10);

  let user;
  try {
    user = await UserData.create({
      Username: username,
      ProfileName: profileName,
      email: normalizedEmail,
      Password: hashed,
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

  // Create the default "Job Hunt" board with its empty columns
  try {
    await initializeUserBoard(user._id.toString());
  } catch (e) {
    // Don't fail sign-up if this fails; the dashboard will retry it
    console.error("Board init failed:", e);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
