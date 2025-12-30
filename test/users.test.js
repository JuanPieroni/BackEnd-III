import Users from "../src/dao/Users.dao.js"
import { expect } from "chai"
import { connectDB, disconnectDB } from "./db.js"
import { logger } from '../src/utils/winston.js'

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
    before(function () {
        this.usersDao = new Users()
    })

    beforeEach(function () {
        this.mockUser = {
            first_name: "Test",
            last_name: "User",
            email: `test${Date.now()}@test.com`,
            password: "hashedPassword123",
            role: "user",
        }
    })

    afterEach(async function () {
        if (this.createdUserId) {
            await this.usersDao.delete(this.createdUserId)
            this.createdUserId = null
        }
    })

    it("el dao debe agregar correctamente un elemento a la base de datos", async function () {
        const response = await this.usersDao.save(this.mockUser)
        this.createdUserId = response._id

        expect(response).to.have.property("_id")
        expect(response.email).to.equal(this.mockUser.email)
    })

    it("al agregar nuevo usuario  debe crearse con un arreglo de mascotas vacío por defecto", async function () {
        const response = await this.usersDao.save(this.mockUser)
        this.createdUserId = response._id

        expect(response.pets).to.be.an("array")
        expect(response.pets).to.have.lengthOf(0)
    })

    it("el dao puede obtener a un usuario por email", async function () {
        const created = await this.usersDao.save(this.mockUser)
        this.createdUserId = created._id

        const found = await this.usersDao.getBy({ email: this.mockUser.email })
        expect(found).to.not.be.null
        expect(found.email).to.equal(this.mockUser.email)
    })
})
