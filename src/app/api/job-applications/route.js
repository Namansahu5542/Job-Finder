import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db";
import Board from "@/models/board";
import Column from "@/models/column";
import JobApplication from "@/models/job_applications";

const jobApplicationSchema = z.object({
  company: z.string().trim().min(1).max(120),
  position: z.string().trim().min(1).max(120),
  salary: z.string().trim().min(1).max(80),
  location: z.string().trim().min(1).max(120),
  jobUrl: z.string().url().max(2048),
  tags: z.array(z.string().trim().min(1).max(40)).max(20),
  description: z.string().trim().min(1).max(10000),
  columnId: z.string().regex(/^[a-f\d]{24}$/i),
  boardId: z.string().regex(/^[a-f\d]{24}$/i),
});

export async function POST(request) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = jobApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid job application details." }, { status: 400 });
  }

  try {
    await dbConnect();

    const { boardId, columnId, ...applicationData } = parsed.data;
    const board = await Board.findOne({ _id: boardId, userid: userId }).select("_id");
    if (!board) {
      return NextResponse.json({ error: "Board not found." }, { status: 404 });
    }

    const column = await Column.findOne({ _id: columnId, boardId: board._id });
    if (!column) {
      return NextResponse.json({ error: "Column not found on this board." }, { status: 404 });
    }

    const application = await JobApplication.create({
      ...applicationData,
      userId,
      boardId: board._id,
      columnId: column._id,
      status: column.name.toLowerCase(),
      order: column.job_applications.length,
    });

    await Column.updateOne(
      { _id: column._id },
      { $push: { job_applications: application._id } }
    );

    return NextResponse.json(
      { success: true, applicationId: application._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create job application:", error);
    return NextResponse.json(
      { error: "Unable to save the job application." },
      { status: 500 }
    );
  }
}
