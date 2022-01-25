import express, {Request, Response} from "express"
import {Product, ProductStore} from "../models/product"
import {Auth} from "./auth"

const product_store = new ProductStore()
const auth = new Auth()

const index = async (req: Request, res: Response) => {
    try {
        const products = await product_store.index()
        res.send(products)
    }
    catch(err) {
        res.status(500).json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await product_store.show(Number(req.params.id))
        res.send(product)
    }
    catch(err) {
        res.status(500).json(err)
    }
}

const create = async (req: Request, res: Response) => {
    const product: Product = {
        id: NaN,
        name: req.body.name,
        price: req.body.price
    }
    try {
        const productCreated = await product_store.create(product)
        res.send(productCreated)
    }
    catch(err) {
        res.status(500).json(err)
    }
}


const productRoutes = (app: express.Application) => {
    app.get("/products", index)
    app.get("/products/:id", show)
    app.post("/products", auth.verifyToken, create)
}

export default productRoutes