import Client from "../database"

export type Order = {
    id: number,
    status: string,
    user_id: number
}
export type OrderProduct = {
    id: number,
    order_id: number,
    product_id: number,
    quantity: number
}

export class OrderStore {

    async create(order: Order): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *"
            const result = await conn.query(sql, [order.status, order.user_id])
            conn.release()
            return result.rows[0]
        }
        catch(err) {
            throw new Error("Cannot create order")
        }
    }

    async addProduct (orderProduct: OrderProduct): Promise<OrderProduct> {
        try {   
            const conn = await Client.connect()
            const sql = "INSERT INTO order_product (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *"
            const result = await conn.query(sql, [
                orderProduct.order_id, 
                orderProduct.product_id, 
                orderProduct.quantity
            ])
            conn.release()
            return result.rows[0]
        }
        catch(err) {
            throw new Error(`Cannot add product to order. ${err}`)
        }
    }

    async ShowOrdersByUser(userId: number): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const sql = "SELECT * FROM orders WHERE user_id = ($1)"
            const result = await conn.query(sql, [userId])
            conn.release()
            return result.rows
        }
        catch (err) {
            throw new Error("Cannot get products")
        }
    }

    async currentOrder(userId: number): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = "SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)"
            const result = await conn.query(sql, [userId, "active"])
            conn.release()
            return result.rows[0]
        }
        catch (err) {
            throw new Error(`Cannot get current order ${err}`)
        }
    }
}