import { Request, Response } from "express"
import User from "../models/user.models";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { signUpData } from "../types/user.types";
import { signInDataValidation, signUpDataValidation } from "../validation/user.validation";

const userSignUp = async (req: Request, res: Response) => {
    
    // Input Validation
    const isValid = signUpDataValidation.safeParse(req.body);

    if(!isValid.success){
        res.status(400).json({
            "Message": "Invalid Data Input",
            "Error": isValid.error.format()
        });

        return;
    }

    // Destrucutre the request body
    const { username, email, password }: signUpData = req.body;

    // Check whether email or username already exists or not
    const isFound = await User.findOne({
        email
    });

    const isTaken = await User.findOne({
        username
    })

    // Return Conflict Status Code if user exists
    if(!isFound || !isTaken){
        res.status(409).json({
            "Message": "User with username and email Already Exists"
        })

        return;
    }

    // Hash Password for Data Security
    const hashPassword = await bcrypt.hash(password, 5);

    // Create User
    try {
        await User.create({
            username,
            email,
            password: hashPassword
        })

        res.status(200).json({
            "Message": "User Created Successfully"
        })
    } catch (error) {
        res.status(400).json({
            "Message": "Something went wrong!!"
        })
        console.error(`Something went wrong ${error}`)
    }
}

const userSignIn = async (req: Request, res: Response) => {

    // Input Validation
    const isValid = signInDataValidation.safeParse(req.body);

    if(!isValid.success){
        res.status(400).json({
            "Message": "Invalid Data Input",
            "Error": isValid.error.format()
        });

        return;
    }

    // Destructure the request body
    const { email, password } = req.body;

    // find whether user exists or not
    const isFound = await User.findOne({
        email
    })

    // User does not exist
    if(!isFound){
        res.status(404).json({
            "message": "User not found!"
        })
        return;
    }

    // Check whether password is valid or not
    const isPasswordCorrect: boolean = await bcrypt.compare(password, isFound?.password as string);

    if(isPasswordCorrect){
        const token: String =  jwt.sign({
            username: isFound.username,
            email,
            id: isFound._id
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
        return;
    }
}

export { userSignUp, userSignIn }