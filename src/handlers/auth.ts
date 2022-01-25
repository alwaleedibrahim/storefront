import express, {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import {User} from "../models/user"

const tokenSecret: string = process.env.TOKEN_SECRET || "secret"

export class Auth {
    sign(user: User) {
        return jwt.sign({user: user}, tokenSecret)
    }
    
    verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader = req.headers.authorization
            if (authorizationHeader) {
                const token = authorizationHeader.split(" ")[1]
                jwt.verify(token, tokenSecret)
            }
            next()
        }
        catch (err) {
            res.status(401)
        }
    }
}
