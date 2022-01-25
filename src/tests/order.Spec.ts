import {OrderStore} from "../models/order"
import {ProductStore} from "../models/product"
import {UserStore} from "../models/user"
import app from "../server"
import supertest from "supertest"

const request = supertest(app)

const order_store = new OrderStore()
const user_store = new UserStore()
const product_store = new ProductStore()

describe("Order Model tests", ()=> {
    it("Creates new order", async ()=> {
        const user = await user_store.create({
            id: 0,
            username: "username_test3",
            firstname: "firstname_test",
            lastname: "lastname_test",
            password: "password_test"
        });
        const order = await order_store.create({
            id: 0,
            status: "active",
            user_id: 1,
        });
        expect(order.status).toBe("active")
        expect(isNaN(order.id)).toBe(false)
        expect(isNaN(order.user_id)).toBe(false)
    })
    
    it("Shows user orders", async () => {
        const orders = await order_store.ShowOrdersByUser(1)
        expect(Number(orders[0].user_id)).toBe(1)
    })
    it("Shows current order", async () => {
        const order = await order_store.currentOrder(1)
        expect(order.status).toBe("active")
        expect(Number(order.user_id)).toBe(1)
    })
    it("Adds product", async () => {
        // Create order and product first
        await order_store.create({
            id: 0,
            status: "active",
            user_id: 1,
        });
        await product_store.create({
            id: 0,
            name: "product_test",
            price: 1
        });
        const added = await order_store.addProduct({
            id: 0,
            order_id: 1,
            product_id: 1,
            quantity: 1
        })
        expect(Number(added.order_id)).toBe(1)
        expect(Number(added.product_id)).toBe(1)
        expect(Number(added.quantity)).toBe(1)
    })
})

describe("Product handler tests", () => {
    it("GET /orders/user/:id works", async() => {
        const response = await request.get("/orders/user/1")
        expect(response.status).toBe(200)
    })

    it("GET /orders/user/:id sends error with invalid params", async() => {
        const response = await request.get("/orders/user/abc")
        expect(response.status).not.toBe(200)
    })

    it("GET /orders/user/:id/current works", async() => {
        const response = await request.get("/orders/user/1/current")
        expect(response.status).toBe(200)
    })

    it("POST /orders works", async() => {
        const response = await request.post("/orders").send({
            status: "active",
            user_id: 1
        })
        expect(response.status).toBe(200)
    })

    it("POST /orders sends error", async() => {
        const response = await request.post("/orders").send({
            invalid_data: "invalid"
        })
        expect(response.status).not.toBe(200)
    })

    it("POST /orders/addProduct works", async() => {
        const response = await request.post("/orders/addProduct").send({
            order_id: 1,
            product_id: 1,
            quantity: 1
        })
        expect(response.status).toBe(200)
    })

    it("POST /orders/addProduct sends error", async() => {
        const response = await request.post("/orders/addProduct").send({
            invalid_data: "invalid"
        })
        expect(response.status).not.toBe(200)
    })
})