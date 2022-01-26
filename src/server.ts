import express, { Request, Response } from 'express'
import dotenv from "dotenv"
import userRoutes from "./handlers/users"
import productRoutes from "./handlers/product"
import orderRoutes from "./handlers/order"

dotenv.config()

const app: express.Application = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
userRoutes(app)
productRoutes(app)
orderRoutes(app)

app.listen(PORT, function () {
    console.log(`starting app on port: ${PORT}`)
})

export default app;