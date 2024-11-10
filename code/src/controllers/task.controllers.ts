import { Request, Response } from "express";
import { taskData } from "../types/user.types";
import { TaskModel } from "../models/task.models";
import { TeamModel } from "../models/team.models";
import { Types } from "mongoose";
import { wss } from "..";


export const addTask = async ( req: Request, res: Response ) => {

    // checks to be added such as 
    // input data validation
    // whether the given assignee id is present in the database or not i.e valid assignee or not
    // whether the assignee exists in the collaborators list or not

    try {
        const teamid = new Types.ObjectId(req.params.teamid)
        const { title, description, assignee, priority, dueDate }: taskData = req.body;

        const TaskDetails = await TaskModel.create({
            title,
            description,
            assignee,
            priority,
            dueDate
        })

        await TeamModel.updateOne({
            _id: teamid
        },
        {
            $push: { tasks: TaskDetails._id }
        })

        res.status(201).json({
            "Message": "New Task Created and Assigned",
            TaskDetails
        })

        wss.clients.forEach((client) => {
            if( client.readyState == client.OPEN){
                client.send(JSON.stringify(TaskDetails))
            }
        })
    } catch (error) {
        
        res.status(400).json({
            "Message": "Something went wrong!",
            "Error": error
        })
    }
}

export const updateTask = async ( req: Request, res: Response ) => {

    // DON'T REFER THIS CODE, IT IS JUST A PROTOTYPE - we have no checks before updating the todo

    // things to add
    // check whether the request is from an listid which contains the taskid in it
    // check whether the taskid is present in the database or not

    try {
        const { taskid } = req.params;
        const completed : boolean = req.body.completed;

        await TaskModel.updateOne({
            _id: taskid
        }, {
            completed: completed
        })

        const CompletedTask = await TaskModel.findOne({
            _id: taskid
        })

        res.status(200).json({
            "Message": "Task completed successfully",
            CompletedTask
        })

        wss.clients.forEach((client) => {
            if( client.readyState == client.OPEN){
                client.send(JSON.stringify(CompletedTask))
            }
        })

    } catch (error) {
        res.status(400).json({
            "Message": "Something went wrong"
        })
    }
}


export const deleteTask = async ( req: Request, res: Response ) => {

    // DON'T REFER THIS CODE, IT IS JUST A PROTOTYPE - we have no checks before deleting a todo

    try {
        const { teamid, taskid } = req.params;
        
        await TaskModel.deleteOne({
            _id: taskid
        });

        const deleted = await TeamModel.updateOne({
            _id: teamid
        }, {
            $pull: { tasks: taskid }
        })

        if(deleted.modifiedCount){
            res.status(200).json({
                "Message": "Task Deleted Successfully"
            })
        }
        else{
            res.status(404).json({
                "Message": "Task not found"
            })
        }
    } catch (error) {
        res.json({
            "Message": "Something went wrong"
        })

        return;
    }
}
