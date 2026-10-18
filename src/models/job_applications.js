import mongoose from "mongoose";
import { Schema } from "mongoose";

const job_Applications = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
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
        tags: [{ type: String }],
        description: { type: String },
    },
    { timestamps: true }   // was: timpestamps
);

export default mongoose.models.Job_Applications || mongoose.model("Job_Applications", job_Applications);