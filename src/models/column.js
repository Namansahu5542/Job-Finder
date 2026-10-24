import mongoose from "mongoose";
import { Schema } from "mongoose";

const ColumnSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        boardId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Board",
        },
        // Field name matches what init-user-board.js writes: orderid (lowercase)
        orderid: {
            type: Number,
            required: true,
            default: 0,
        },
        job_applications: [
            {
                type: Schema.Types.ObjectId,
                ref: "Job_Applications",
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.Column || mongoose.model("Column", ColumnSchema);