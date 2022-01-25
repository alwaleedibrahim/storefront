import Client from "../database"
import bcrypt from "bcrypt"

const pepper = process.env.PEPPER
const saltRounds = process.env.SALT_ROUNDS || "10"

export type User = {
    id: Number,
    username: string,
    firstname: string;
    lastname: string;
    password: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect()
            const sql = "SELECT * FROM users"
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }
        catch (err) {
            throw new Error("Cannot get users")
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = "SELECT * FROM users WHERE id=($1)"
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        }
        catch(err) {
            throw new Error("Cannot get user")
        }
    }

    async create(user: User): Promise<User> {
        try {
            const hashedPassword = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds))
            const conn = await Client.connect()
            const sql = "INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *"
            const result = await conn.query(sql, [user.username, user.firstname, user.lastname, hashedPassword])
            conn.release()
            return result.rows[0]
        }
        catch(err) {
            throw new Error("Cannot create user")
        }
    }

    async auth(username: string, password: string): Promise<User | null> {
        try {
            const conn = await Client.connect()
            const sql = "SELECT * FROM users WHERE username=($1)"
            const result = await conn.query(sql, [username])
            const user = result.rows[0]
            if (user) {
                if(bcrypt.compareSync(password + pepper, user.password)) {
                    return user
                }
                else {
                    throw new Error("incorrect password")
                }
            }
            return null
        }
        catch (err) {
            throw new Error(`Authentication failed: ${err}`)
        }
    }
}