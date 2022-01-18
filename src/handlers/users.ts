import express, {Request, Response} from "express"
import {User, UserStore} from "../models/user"

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
        id: NaN,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    }
    try {
        const userCreated = await user_store.create(user)
        res.send(userCreated)
    }
    catch(err) {
        res.status(500).json(err)
    }
}


const userRoutes = (app: express.Application) => {
    app.get("/users", index)
    app.get("/users/:id", show)
    app.post("/users", create)
}

export default userRoutes