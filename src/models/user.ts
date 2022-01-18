import Client from "../database"

export type User = {
    id: number;
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
            const conn = await Client.connect()
            const sql = "INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *"
            const result = await conn.query(sql, [user.firstname, user.lastname, user.password])
            conn.release()
            return result.rows[0]
        }
        catch(err) {
            throw new Error("Cannot create user")
        }
    }
}