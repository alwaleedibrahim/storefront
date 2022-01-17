import dotenv from "dotenv"
import {Pool} from "pg"

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env

const options = {
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
}

if (ENV === "test") {
    options.database = POSTGRES_DB_TEST
}

const client = new Pool(options)

export default client