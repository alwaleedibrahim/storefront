import {UserStore} from "../models/user"
import app from "../server"
import supertest from "supertest"

const request = supertest(app)

const user_store = new UserStore()

describe("User Model tests", ()=> {
    it("Creates new user", async ()=> {
        const user = await user_store.create({
            id: 0,
            username: "username_test",
            firstname: "firstname_test",
            lastname: "lastname_test",
            password: "password_test"
        });
        expect(user.username).toBe("username_test")
        expect(user.firstname).toBe("firstname_test")
        expect(user.lastname).toBe("lastname_test")
        expect(typeof user.password).toBe("string")
    })
    
    it("Encypts password", async ()=> {
        const user = await user_store.create({
            id: 0,
            username: "username_test1",
            firstname: "firstname_test",
            lastname: "lastname_test",
            password: "password_test"
        });
        expect(user.password).not.toBe("password_test")
    })
    
    it("Shows user", async () => {
        const user = await user_store.show(1)
        expect(user.id).toEqual(1)
        expect(typeof user.firstname).toBe("string")
        expect(typeof user.lastname).toBe("string")
        expect(typeof user.password).toBe("string")
    })

    it("Show all users", async () => {
        const users = await user_store.index()
        expect(typeof users).toBe("object")
        expect(typeof users[0].id).toBe("number")
    })

    it("Authenticate user", async () => {
        const user = await user_store.create({
            id: 0,
            username: "username_test2",
            firstname: "firstname_test",
            lastname: "lastname_test",
            password: "password_test"
        });
        const tryAuth = await user_store.auth(user.username, "password_test")
        expect(tryAuth).not.toBeNull()
    })
})

describe("User handler tests", () => {

    it("POST /users works", async() => {
        const response = await request.post("/users")
        .send({
            username: "username_test4",
            firstname: "firstname_test",
            lastname: "lastname_test",
            password: "password_test"
        })
        .set("Content-Type", "application/x-www-form-urlencoded")
        expect(response.status).toBe(200)
    })

    it("POST /users sends error", async() => {
        const response = await request.post("/users").send({
            invalid_data: "invalid"
        })
        .set("Content-Type", "application/x-www-form-urlencoded")
        expect(response.status).not.toBe(200)
    })

    it("POST /login works", async() => {
        const user = await user_store.create({
            id: 0,
            username: "username_test12",
            firstname: "firstname_test",
            lastname: "lastname_test",
            password: "password_test"
        });
        const response = await request.post("/login")
        .send({
            username: "username_test12",
            password: "password_test"
        })
        .set("Content-Type", "application/x-www-form-urlencoded")
        expect(response.status).toBe(200)
    })

    it("POST /login sends error", async() => {
        const response = await request.post("/login").send({
            username: "invalid",
            password: "invalid"
        })
        .set("Content-Type", "application/x-www-form-urlencoded")
        expect(response.status).not.toBe(200)
    })

    it("GET /users/:id works", async() => {
        const response = await request.get("/users/1")
        expect(response.status).toBe(200)
    })

    it("GET /users works", async() => {
        const response = await request.get("/users")
        expect(response.status).toBe(200)
    })
})