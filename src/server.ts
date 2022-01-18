import express, { Request, Response } from 'express'
import dotenv from "dotenv"
import userRoutes from "./handlers/users"

dotenv.config()

const app: express.Application = express()
const PORT = process.env.PORT || 3000

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
userRoutes(app)

app.listen(PORT, function () {
    console.log(`starting app on port: ${PORT}`)
})

export default app;