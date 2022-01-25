import express, {Request, Response, NextFunction} from "express"
import {User, UserStore} from "../models/user"
import jwt from "jsonwebtoken"
import { isNamedExportBindings } from "typescript"

const tokenSecret: string = process.env.TOKEN_SECRET || "secret"

const user_store = new UserStore()

const index = async (req: Request, res: Response) => {
    try {
        const users = await user_store.index()
        res.send(users)
    }
    catch(err) {
        res.status(500).json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const user = await user_store.show(Number(req.params.id))
        res.send(user)
    }
    catch(err) {
        res.status(500).json(err)
    }
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        id: 0,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    }
    try {
        const userCreated = await user_store.create(user)
        const token = jwt.sign({user: userCreated}, tokenSecret)
        res.send(token)
    }
    catch(err) {
        res.status(500).json(err)
    }
}

const auth = async (req: Request, res: Response) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await user_store.auth(username, password)
        if (!user) {
            throw new Error("Authentication failed")
        }
        res.send(user)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (authorizationHeader) {
            const token = authorizationHeader.split(" ")[1]
            const decoded = jwt.verify(token, tokenSecret)
        }
        next()
    }
    catch (err) {
        res.status(401)
    }
}


const userRoutes = (app: express.Application) => {
    app.get("/users", verifyToken, index)
    app.get("/users/:id", verifyToken, show)
    app.post("/users", create)
}

export default userRoutes