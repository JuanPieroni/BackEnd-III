import Users from "../dao/Users.dao.js"
import { expect } from "chai"

/* describe("Create Users", function () {
    it()
  
}) */

describe("Get Users", function () {
    it("debe entregar un array vacio", async function () {
        const usersDao = new Users()
        const result = await usersDao.get()
        expect(result).to.be.an("array")
    })
})
