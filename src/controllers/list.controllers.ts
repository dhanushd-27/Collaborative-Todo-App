import { Request, Response } from 'express';
import { TeamModel } from '../models/team.models';

export const createTeam = async (req: Request, res: Response) => {

    // Get User Data from auth and Title of the group from body
    const { id } = req.user;
    const { title } = req.body;

    try {
        const newTeam = await TeamModel.create({
            owner: id,
            title: title
        })

        const details = await TeamModel.findById(newTeam._id).populate('owner');

        console.log(details);

        res.status(200).json({
            "Message": "Teams Created Successfully",
            "Details": details
        })
    } catch (error) {
        
        res.status(400).json({
            "Message": "Something went wrong!!"
        })
    }
}

