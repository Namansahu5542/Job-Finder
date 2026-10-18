import dbConnect from "@/lib/db";
import Board from "@/models/board";
import Column from "@/models/column";

const defaultColumns = [
    { name: "Wishlist", order: 0 },
    { name: "Applied", order: 1 },
    { name: "Interviewing", order: 2 },
    { name: "Offer", order: 3 },
    { name: "Rejected", order: 4 },
];

export async function initializeUserBoard(userId) {
    await dbConnect();

    // Don't create a second board if one already exists
    const existing = await Board.findOne({ userid: userId, name: "Job Hunt" });
    if (existing) return existing;

    const board = await Board.create({
        name: "Job Hunt",
        userid: userId,
        columns: [],
    });

    const columns = await Promise.all(
        defaultColumns.map((col) =>
            Column.create({
                name: col.name,
                orderid: col.order,
                boardId: board._id,
                job_applications: [],
            })
        )
    );

    board.columns = columns.map((col) => col._id);
    await board.save();

    return board;
}