"use server"
import Job_Applications from "@/models/job_applications";
import { auth } from "./auth/auth";
import dbConnect from "./db";
import Board from "@/models/board";
import Column from "@/models/column";
import { updateTag } from "next/cache";
import { Josefin_Slab } from "next/font/google";
import job_applications from "@/models/job_applications";

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
    updateTag(`board-${userId}`);
    return {
        message: "Job application added successfully.",
        data: JSON.parse(JSON.stringify(application)),
    };
}
export async function updatejobapplications(applicationId, updates) {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return { error: "Authentication required." };

    await dbConnect();

    const application = await Job_Applications.findOne({ _id: applicationId, userId });
    if (!application) return { error: "Application not found." };

    const { columnId, order, ...fields } = updates;

    const $set = {};
    for (const [key, value] of Object.entries(fields)) {
        if (value !== undefined) $set[key] = value;
    }

    const oldColumnId = application.columnId.toString();
    const oldOrder = application.order; // keep as a number
    const hasOrder = order !== undefined && order !== null;

    if (columnId && String(columnId) !== oldColumnId) {
        // Validate before any writes
        const newColumn = await Column.findOne({ _id: columnId, boardId: application.boardId });
        if (!newColumn) return { error: "Column not found on this board." };

        const count = await Job_Applications.countDocuments({ columnId: newColumn._id });
        const newOrder = hasOrder ? Math.min(order, count) : count;

        // Close the gap in the old column
        await Job_Applications.updateMany(
            { columnId: oldColumnId, order: { $gt: oldOrder } },
            { $inc: { order: -1 } }
        );
        // Open a slot in the new column
        await Job_Applications.updateMany(
            { columnId: newColumn._id, order: { $gte: newOrder } },
            { $inc: { order: 1 } }
        );
        // Keep the column arrays in sync
        await Column.updateOne({ _id: oldColumnId }, { $pull: { job_applications: application._id } });
        await Column.updateOne({ _id: newColumn._id }, { $push: { job_applications: application._id } });

        $set.columnId = newColumn._id;
        $set.order = newOrder;
        $set.status = newColumn.name.toLowerCase();
    } else if (hasOrder && order !== oldOrder) {
        if (order > oldOrder) {
            await Job_Applications.updateMany(
                { columnId: oldColumnId, order: { $gt: oldOrder, $lte: order } },
                { $inc: { order: -1 } }
            );
        } else {
            await Job_Applications.updateMany(
                { columnId: oldColumnId, order: { $gte: order, $lt: oldOrder } },
                { $inc: { order: 1 } }
            );
        }
        $set.order = order;
    }

    const updated = await Job_Applications.findByIdAndUpdate(
        application._id,
        { $set },
        { new: true }
    );

    updateTag(`board-${userId}`);
    return {
        message: "Job application updated successfully.",
        data: JSON.parse(JSON.stringify(updated)),
    };
}