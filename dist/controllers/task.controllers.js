"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = void 0;
const task_models_1 = require("../models/task.models");
const team_models_1 = require("../models/team.models");
const mongoose_1 = require("mongoose");
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // checks to be added such as 
    // input data validation
    // whether the given assignee id is present in the database or not i.e valid assignee or not
    // whether the assignee exists in the collaborators list or not
    try {
        const teamid = new mongoose_1.Types.ObjectId(req.params.teamid);
        const { title, description, assignee, priority, dueDate } = req.body;
        const TaskDetails = yield task_models_1.TaskModel.create({
            title,
            description,
            assignee,
            priority,
            dueDate
        });
        yield team_models_1.TeamModel.updateOne({
            _id: teamid
        }, {
            $push: { tasks: TaskDetails._id }
        });
        res.status(201).json({
            "Message": "New Task Created and Assigned"
        });
    }
    catch (error) {
        res.status(400).json({
            "Message": "Something went wrong!",
            "Error": error
        });
    }
});
exports.addTask = addTask;
