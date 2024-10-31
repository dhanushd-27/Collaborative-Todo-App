import mongoose from "mongoose";
import { TaskSchema } from "./task.models";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TeamSchema = new mongoose.Schema(
    {
        owner: { type: ObjectId, ref: 'User' },
        title: String,
        tasks: [TaskSchema],
        collaborators: [{ type: ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

const TeamModel = mongoose.model("team", TeamSchema);

export { TeamModel };