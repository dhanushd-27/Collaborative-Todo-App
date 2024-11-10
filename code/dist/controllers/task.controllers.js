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
exports.deleteTask = exports.updateTask = exports.addTask = void 0;
const task_models_1 = require("../models/task.models");
const team_models_1 = require("../models/team.models");
const mongoose_1 = require("mongoose");
const __1 = require("..");
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
            "Message": "New Task Created and Assigned",
            TaskDetails
        });
        __1.wss.clients.forEach((client) => {
            if (client.readyState == client.OPEN) {
                client.send(JSON.stringify(TaskDetails));
            }
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
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // DON'T REFER THIS CODE, IT IS JUST A PROTOTYPE - we have no checks before updating the todo
    // things to add
    // check whether the request is from an listid which contains the taskid in it
    // check whether the taskid is present in the database or not
    try {
        const { teamid, taskid } = req.params;
        const completed = req.body.completed;
        yield task_models_1.TaskModel.updateOne({
            _id: taskid
        }, {
            completed: completed
        });
        const CompletedTask = yield task_models_1.TaskModel.findOne({
            _id: taskid
        });
        res.status(200).json({
            "Message": "Task completed successfully",
            CompletedTask
        });
        __1.wss.clients.forEach((client) => {
            if (client.readyState == client.OPEN) {
                client.send(JSON.stringify(CompletedTask));
            }
        });
    }
    catch (error) {
        res.status(400).json({
            "Message": "Something went wrong"
        });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // DON'T REFER THIS CODE, IT IS JUST A PROTOTYPE - we have no checks before deleting a todo
    try {
        const { teamid, taskid } = req.params;
        yield task_models_1.TaskModel.deleteOne({
            _id: taskid
        });
        const deleted = yield team_models_1.TeamModel.updateOne({
            _id: teamid
        }, {
            $pull: { tasks: taskid }
        });
        if (deleted.modifiedCount) {
            res.status(200).json({
                "Message": "Task Deleted Successfully"
            });
        }
        else {
            res.status(404).json({
                "Message": "Task not found"
            });
        }
    }
    catch (error) {
        res.json({
            "Message": "Something went wrong"
        });
        return;
    }
});
exports.deleteTask = deleteTask;
