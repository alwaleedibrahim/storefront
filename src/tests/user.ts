import {UserStore} from "../models/user"

const user_store = new UserStore()

describe("User Model tests", ()=> {
    it("Creates new user", async ()=> {
        const user = await user_store.create({
            id: NaN,
            firstname: "firstname_test",
            lastname: "lastname_test",
            password: "password_test"
        });
        expect(user.firstname).toBe("firstname_test")
        expect(user.lastname).toBe("lastname_test")
    })
    /*
    TODO: password encryption not yet implemented
    it("Encypts password", async ()=> {
        const user = await user_store.create({
            id: NaN,
            firstname: "firstname_test",
            lastname: "lastname_test",
            password: "password_test"
        });
        expect(user.password).not.toEqual("password_test")
    })
    */
    it("Shows user", async () => {
        const user = await user_store.show(1)
        expect(user.id).toEqual(1)
    })
    it("Show all users", async () => {
        const users = await user_store.index()
        expect(typeof users).toBe("object")
    })
})