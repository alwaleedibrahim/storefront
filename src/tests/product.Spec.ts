import {ProductStore} from "../models/product"
import app from "../server"
import supertest from "supertest"

const request = supertest(app)

const product_store = new ProductStore()

describe("product Model tests", ()=> {
    it("Creates new product", async ()=> {
        const product = await product_store.create({
            id: 0,
            name: "product_test",
            price: 1
        });
        expect(product.name).toBe("product_test")
        expect(Number(product.price)).toBe(1)
    })
    
    it("Shows product", async () => {
        const product = await product_store.show(1)
        expect(product.id).toEqual(1)
        expect(typeof product.name).toBe("string")
        expect(isNaN(product.price)).toBe(false)
    })
    it("Show all products", async () => {
        const products = await product_store.index()
        expect(typeof products).toBe("object")
        expect(typeof products[0].id).toBe("number")
    })
})


describe("Product handler tests", () => {
    it("POST /products works", async() => {
        const response = await request.post("/products").send({
            name: "product1",
            price: 10
        })
        .set("Content-Type", "application/x-www-form-urlencoded")
        expect(response.status).toBe(200)
    })

    it("POST /products sends error", async() => {
        const response = await request.post("/products").send({
            invalid_data: "invalid"
        })
        .set("Content-Type", "application/x-www-form-urlencoded")
        expect(response.status).not.toBe(200)
    })

    it("GET /products/:id works", async() => {
        const response = await request.get("/products/1")
        expect(response.status).toBe(200)
    })

    it("GET /products/:id sends error with invalid params", async() => {
        const response = await request.get("/products/abc")
        expect(response.status).not.toBe(200)
    })

    it("GET /products works", async() => {
        const response = await request.get("/products")
        expect(response.status).toBe(200)
    })
})