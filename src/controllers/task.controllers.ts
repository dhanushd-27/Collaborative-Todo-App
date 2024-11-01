import { Request, Response } from "express";
import { taskData } from "../types/user.types";
import { TaskModel } from "../models/task.models";
import { TeamModel } from "../models/team.models";
import { Types } from "mongoose";


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
            "Message": "New Task Created and Assigned"
        })
    } catch (error) {
        
        res.status(400).json({
            "Message": "Something went wrong!",
            "Error": error
        })
    }
}

// export const updateTask = async ( req: Request, res: Response ) => {

//     // check whether the request is from an listid which contains the taskid in it
//     // check whether the taskid is present in the database or not

//     const { teamid, taskid } = req.params;

//     const teamIdObject = new Object(teamid);
//     const taskIdObject = new Object(taskid);

//     await 
// }