import Users from "../src/dao/Users.dao.js"
import { expect } from "chai"
import { connectDB, disconnectDB } from "./db.js"

before(async function () {
    await connectDB()
})

after(async function () {
    await disconnectDB()
})

describe("Obtener usuarios", function () {
    before(function () {
        this.usersDao = new Users()
    })

    beforeEach(async function () {
        this.result = await this.usersDao.get()
    })

    it("debe entregar un array de usuarios ", async function () {
        expect(this.result).to.be.an("array")
    })

    it("debe entregar un array con 1+ usuarios", async function () {
        expect(this.result).to.be.an("array")
        expect(this.result.length).to.be.greaterThan(0)
    })

    it("cada usuario debe tener las propiedades requeridas", async function () {
        this.result.forEach((user) => {
            expect(user).to.have.property("_id")
            expect(user).to.have.property("first_name")
            expect(user).to.have.property("last_name")
            expect(user).to.have.property("email")
            expect(user).to.have.property("password")
            expect(user).to.have.property("role")
            expect(user).to.have.property("pets")
        })
    })

    it("cada usuario debe tener un email válido", async function () {
        this.result.forEach((user) => {
            expect(user.email).to.include("@")
        })
    })

    it("cada usuario debe tener un array de pets", async function () {
        this.result.forEach((user) => {
            expect(user.pets).to.be.an("array")
        })
    })

    it("el id debe ser un i dde mongo", async function () {
        this.result.forEach((user) => {
            expect(user._id.toString()).to.have.lengthOf(24)
        })
    })
    it("el role debe ser 'user' o 'admin'", async function () {
        this.result.forEach((user) => {
            expect(user.role).to.be.oneOf(["user", "admin"])
        })
    })
    it("el email debe tener formato válido", async function () {
        this.result.forEach((user) => {
            expect(user.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        })
    })
    it("el password debe estar hasheado", async function () {
        this.result.forEach((user) => {
            expect(user.password).to.not.equal("coder123")
            expect(user.password).to.have.lengthOf.greaterThan(20)
        })
    })
})

describe("Crear Usuario", function () {
 
})
