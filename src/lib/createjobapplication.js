"use server"
import Job_Applications from "@/models/job_applications";
import { auth } from "./auth/auth";
import dbConnect from "./db";
import Board from "@/models/board";
import Column from "@/models/column";

export default async function createjobapplication({ data }) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return { error: "Authentication required." };
    }

    await dbConnect();
    const {
        company,
        position,
        salary,
        location,
        jobUrl,
        notes,
        tags,
        description,
        boardId,
        columnid,
    } = data;

    const board = await Board.findOne({ _id: boardId, userid: userId });

    if (!board) {
        return { error: "Board not found." };
    }

    const column = await Column.findOne({ _id: columnid, boardId: board._id });
    if (!column) {
        return { error: "Column not found on this board." };
    }
    const lastApplication = await Job_Applications
        .findOne({ columnId: column._id })
        .sort({ order: -1 })
        .select("order")
        .lean();
    const nextOrder = (lastApplication?.order ?? -1) + 1;

    const application = await Job_Applications.create({
        company,
        position,
        location,
        status: column.name.toLowerCase(),
        columnId: column._id,
        boardId: board._id,
        userId,
        order: nextOrder,
        jobUrl,
        notes: notes || null,
        salary,
        tags: tags || [],
        description,
    });

    await Column.updateOne(
        { _id: column._id },
        { $push: { job_applications: application._id } }
    );

    return {
        message: "Job application added successfully.",
        data: JSON.parse(JSON.stringify(application)),
    };
}