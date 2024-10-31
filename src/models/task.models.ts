import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true},
        completed: { type: Boolean, default: false },
        assignee: String,
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        dueDate: Date,
    },
    { timestamps: true }
);

const TaskModel = mongoose.model("task", TaskSchema);

export { TaskModel, TaskSchema };