import { Request, Response } from 'express';
import { TeamModel } from '../models/team.models';
import mongoose from 'mongoose';
import { wss } from '../index';

export const createTeam = async (req: Request, res: Response) => {

    // Get User Data from auth and Title of the group from body
    const { id } = req.user;
    const { title } = req.body;

    try {
        const newTeam = await TeamModel.create({
            owner: id,
            title: title,
            collaborators: [id]
        })

        const details = await TeamModel.findById(newTeam._id).populate('owner');

        res.status(201).json({
            "Message": "Teams Created Successfully",
            "Details": details
        })

        wss.clients.forEach((client) => {
            if( client.readyState == client.OPEN){
                client.send(JSON.stringify(details))
            }
        })
    } catch (error) {
        
        res.status(400).json({
            "Message": "Something went wrong!!",
            Error: error
        })
    }
}

export const addCollaborator = async (req: Request, res: Response) => {
    
    const teamid: string = req.params.teamid;
    const newCollaboratorId = req.body.id;

    // check whether the list already exists or not
    const isFound = await TeamModel.findOne({
        _id: teamid
    });

    if(!isFound){
        res.status(404).json({
            "Message": "Given Team doesn't exist"
        })
        return;
    }

    // check whether the collaborator is already present in the list or not
    const doesExist: boolean = isFound.collaborators.includes(newCollaboratorId);

    if(doesExist){
        res.status(409).json({
            "Message": "Already a team member"
        })
        return;
    }

    // if not add the new collaborator
    // add collaborator
    await TeamModel.updateOne({
        _id: teamid
    },{
        $push: { collaborators : newCollaboratorId }
    })

    // Fetch Collaborators data
    const PopulateCollaborators = await TeamModel
        .findOne({ _id: teamid })
        .populate('collaborators')


    // try to store only username in a list later
    const CollaboratorList = PopulateCollaborators?.collaborators

    res.status(200).json({
        "Message": "Collaborator Added Successfully",
        "Collaborators": CollaboratorList
    })
}

export const removeCollaborator = async (req: Request, res: Response) => {

    const { teamid, userid } = req.params;

    // Convert the parameters to ObjectId
    const teamIdObjectId = new mongoose.Types.ObjectId(teamid);
    const userIdObjectId = new mongoose.Types.ObjectId(userid);

    // check whether the list already exists or not
    const isFound = await TeamModel.findOne({
        _id: teamIdObjectId
    });

    if(!isFound){
        res.status(404).json({
            "Message": "Given Team doesn't exist"
        })
        return;
    }

    // check whether the collaborator is already present in the list or not
    const doesExist: boolean = isFound.collaborators.includes(userIdObjectId, 0);

    if(!doesExist){
        res.status(409).json({
            "Message": "Given Id doesn't belong to the team"
        })
        return;
    }

    const details = await TeamModel.updateOne({
        _id: teamIdObjectId
    }, {
        $pull: { collaborators: userIdObjectId }
    })

    if(details.modifiedCount){
        res.json({
            "Message": "Successfully removed Collaborator",
            details: details
        })
    }

    else{
        res.json({
            "Message": "Something went wrong!!"
        })
    }
}