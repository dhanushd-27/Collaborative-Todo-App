import { Request, Response } from "express"
import UserModel from "../models/user.models";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSignUp = async (req: Request, res: Response) => {
    
    // Destrucutre the request body
    const { username, email, password } = req.body;

    // Check whether user already exists or not
    const isFound = await UserModel.findOne({
        username,
        email
    });

    // Return Conflict Status Code if user exists
    if(!isFound){
        res.status(409).json({
            "Message": "User Already Exists"
        })
    }

    // Hash Password for Data Security
    const hashPassword = await bcrypt.hash(password, 5);

    // Create User
    try {
        await UserModel.create({
            username,
            email,
            password: hashPassword
        })

        res.status(200).json({
            "Message": "User Created Successfully"
        })
    } catch (error) {
        console.error(`Something went wrong ${error}`)
    }
}

const userSignIn = async (req: Request, res: Response) => {

    // Destructure the request body
    const { email, password } = req.body;

    // find whether user exists or not
    const isFound = await UserModel.findOne({
        email
    })

    if(!isFound){
        res.status(404).json({
            "message": "User not found!"
        })
    }

    const isPasswordCorrect: boolean = await bcrypt.compare(password, isFound?.password as string);

    if(isPasswordCorrect){
        const token: String =  jwt.sign({
            email,
            id: isFound?._id
        }, process.env.SECRET_KEY as string);

        res.status(200).json({
            "Message": "User Logged In Successfully",
            token: token
        })
    }
    else{
        res.status(401).json({
            "Message": "Unauthorized User"
        })
    }
}

export { userSignUp, userSignIn }