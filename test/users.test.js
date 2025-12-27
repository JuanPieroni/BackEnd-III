import Users from "../src/dao/Users.dao.js"
import { expect } from "chai"
import { connectDB, disconnectDB } from './db.js'

before(async function () {
    await connectDB()
})

after(async function () {
    await disconnectDB()
})

/* describe("Create Users", function () {
    it()
  
}) */

describe("Obtener usuarios", function () {
    it("debe entregar un array de usuarios ", async function () {
        const usersDao = new Users()
        const result = await usersDao.get()
        expect(result).to.be.an("array")
    })

    it("debe entregar un array con 1+ usuarios", async function () {
        const usersDao = new Users()
        const result = await usersDao.get()
        expect(result).to.be.an("array")
        expect(result.length).to.be.greaterThan(0)
    })
})
