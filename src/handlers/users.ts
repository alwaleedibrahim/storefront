import express, {Request, Response} from "express"
import {User, UserStore} from "../models/user"
import { Auth } from "../helpers/auth"

const user_store = new UserStore()
const auth = new Auth()

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
        await user_store.create(user)
        const token = auth.sign(user)
        res.send(token)
    }
    catch(err) {
        res.status(500).json(err)
    }
}

const login = async (req: Request, res: Response) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await user_store.auth(username, password)
        if (!user) {
            throw new Error("Authentication failed")
        }
        const token = auth.sign(user)
        res.send(token)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

const userRoutes = (app: express.Application) => {
    app.get("/users", auth.verifyToken, index)
    app.get("/users/:id", auth.verifyToken, show)
    app.post("/users", create)
    app.post("/login", login)
}

export default userRoutes