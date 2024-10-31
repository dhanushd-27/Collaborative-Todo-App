import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

const userAuth = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.token as string;

    if(!token){
        res.status(400).json({
            "Message": "Given token is undefined"
        })
    }

    try {
        const decodedData = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
        
        // req.cookies is not secured ig
        req.user = decodedData

        next();
    } catch (error) {
        res.status(403).json({
            "Message": "Unauthorized User"
        })
    }
}

export { userAuth }