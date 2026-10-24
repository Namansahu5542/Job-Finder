import mongoose from "mongoose";
import { Schema } from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true,
        },
        position: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            required: true,
            default: "applied",
        },
        columnId: {
            type: Schema.Types.ObjectId,   // was: Schema.Types, ObjectId  (syntax error)
            ref: "Column",
            required: true,
            index: true,
        },
        boardId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Board",
            index: true,
        },
        userId: {
            type: String,
            required: true,
            index: true,
        },
        order: {
            type: Number,
            required: true,
            default: 0,
        },
        jobUrl: {
            type: String,
            required: true,
            trim: true,
        },
        notes: {
            type: String,
        },
        salary: {
            type: String,
        },
        AppliedDate: {
            type: Date,
        },
        tags: [{ type: String, trim: true }],
        description: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

export default mongoose.models.Job_Applications || mongoose.model("Job_Applications", jobApplicationSchema);