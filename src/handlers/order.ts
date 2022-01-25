import express, {Request, Response} from "express"
import {Order, OrderProduct, OrderStore} from "../models/order"
import {Auth} from "./auth"

const order_store = new OrderStore()
const auth = new Auth()

const create = async(req: Request, res: Response) => {
    const order: Order = {
        id:NaN,
        status: req.body.status,
        user_id: req.body.user_id
    }
    try{
        const orderCreated = await order_store.create(order)
        res.send(orderCreated)
    }
    catch(err) {
        res.status(500).json(err)
    }
}

const addProduct = async(req: Request, res: Response) => {
    const orderProduct: OrderProduct = {
        id: NaN,
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }
    try{
        const addedProduct = await order_store.addProduct(orderProduct)
        res.send(addedProduct)
    }
    catch(err) {
        res.status(500).json(err)
    }
}

const ShowOrdersByUser = async(req: Request, res: Response) => {
    try{
        const ordersByUser = await order_store.ShowOrdersByUser(Number(req.params.id))
        res.send(ordersByUser)
    }
    catch(err) {
        res.status(500).json(err)
    }
}

const showCurrentOrder = async(req: Request, res: Response) => {
    try {
        const currentOrder = await order_store.currentOrder(Number(req.body.user_id))
        res.send(currentOrder)
    }
    catch(err) {
        res.status(500).json(err)
    }
}

const orderRouters = (app: express.Application) => {
    app.post("/orders", auth.verifyToken, create)
    app.post("/orders/addProduct", auth.verifyToken, addProduct)
    app.get("/orders/user/:id", auth.verifyToken, ShowOrdersByUser)
    app.get("/orders/user/:id/current", auth.verifyToken, showCurrentOrder)
}