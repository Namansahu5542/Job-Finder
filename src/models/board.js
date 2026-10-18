import mongoose from "mongoose";
import { Schema } from "mongoose";

const board = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        userid: {
            type: String,
            required: true,
        },
        columns: [
            {
                type: Schema.Types.ObjectId,
                ref: "Column",
                index: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Board || mongoose.model("Board", board);
