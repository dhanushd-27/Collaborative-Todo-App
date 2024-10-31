"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const task_models_1 = require("./task.models");
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.ObjectId;
const TeamSchema = new mongoose_1.default.Schema({
    owner: { type: ObjectId, ref: 'User' },
    title: String,
    tasks: [task_models_1.TaskSchema],
    collaborators: [{ type: ObjectId, ref: 'User' }],
}, { timestamps: true });
const TeamModel = mongoose_1.default.model("team", TeamSchema);
exports.TeamModel = TeamModel;
