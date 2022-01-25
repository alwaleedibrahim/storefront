import {ProductStore} from "../models/product"

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