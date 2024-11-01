import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { TeamModel } from "../models/team.models";

const Object = Types.ObjectId

const collaboratorAuth = async ( req: Request, res: Response, next: NextFunction ) => {

    const id = new Object(req.user.id as string);
    const teamid =  new Object(req.params.teamid as string);

    const TeamDetails = await TeamModel.findOne({
        _id: teamid,
    })

    const isFound: boolean = TeamDetails?.collaborators.includes(id, 0) as boolean;

    if(!isFound){
        res.status(403).json({
            "Message": "Unauthorized Access!"
        })
    }
    else{
        next();
    }
}

export { collaboratorAuth };