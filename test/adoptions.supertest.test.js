import { expect } from "chai"
import supertest from "supertest"
import { logger } from "../src/utils/winston.js"

const request = supertest("http://localhost:8080")

describe("adoptions endopoints", () => {
    let testUserId
    let testPetId
    let testAdoptionId
    let testUserId2

    before(async () => {
        const mockUser = {
            first_name: "adoption user test",
            last_name: "test user",
            email: `adoption${Date.now()}@test.com`,
            password: "testpassword",
        }
        const userResponse = await request
            .post("/api/sessions/register")
            .send(mockUser)
        testUserId = userResponse.body.payload

        const mockPet = {
            name: "adoption pet test",
            specie: "dog",
            birthDate: "2025-11-03",
        }
        const petResponse = await request.post("/api/pets").send(mockPet)
        testPetId = petResponse.body.payload._id
    })

    describe("GET /api/adoptions - obtener todas las adopciones", () => {
        it("devuelve array de adoptions", async () => {
            const response = await request.get("/api/adoptions")

            expect(response.status).to.equal(200)
            expect(response.body).to.have.property("status", "success")
            expect(response.body).to.have.property("payload")
            expect(response.body.payload).to.be.an("array")
        })
    })

    describe("POST /api/adoptions/:uid/:pid - crear adopcion", () => {
        it("crea una adopcion correctamente", async () => {
            const response = await request.post(
                `/api/adoptions/${testUserId}/${testPetId}`
            )
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property("status", "success")
            expect(response.body).to.have.property("message", "Pet adopted")
        })

        it("defe fallar si el usuario no existe", async () => {
            const idmongoTrucho = "507f1f77bcf86cd799439011"
            const response = await request.post(
                `/api/adoptions/${idmongoTrucho}/${testPetId}`
            )

            expect(response.status).to.equal(404)
            expect(response.body).to.have.property("status", "error")
            expect(response.body).to.have.property("error", "user Not found")
        })
        it("debe fallar si la mascota no existe", async () => {
            const idPetTrucho = "507f1f77bcf86cd799439011"
            const response = await request.post(
                `/api/adoptions/${testUserId}/${idPetTrucho}`
            )

            expect(response.status).to.equal(404)
            expect(response.body).to.have.property("status", "error")
            expect(response.body).to.have.property("error", "Pet not found")
        })

        it("debe fallar si la mascota ya esta adoptada", async () => {
            const mockUser2 = {
                first_name: "2do adoption user",
                last_name: "test user",
                email: `adoption2${Date.now()}@test.com`,
                password: "testpassword2",
            }
            const userResponse2 = await request
                .post("/api/sessions/register")
                .send(mockUser2)
            testUserId2 = userResponse2.body.payload

            const response = await request.post(
                `/api/adoptions/${testUserId2}/${testPetId}`
            )
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property("status", "error")
            expect(response.body).to.have.property(
                "error",
                "mascota ya adoptada"
            )
        })
    })

    describe("Get /api/adoptions/:aid get una adoption por id ", () => {
        before(async () => {
            const adoptions = await request.get("/api/adoptions")
            if (adoptions.body.payload.length > 0) {
                testAdoptionId = adoptions.body.payload[0]._id
            }
        })

        it("debe devolver una adopcion id ", async () => {
            if (!testAdoptionId) {
                this.skip()
            }
            const response = await request.get(
                `/api/adoptions/${testAdoptionId}`
            )
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property("status", "success")
            expect(response.body).to.have.property("payload")
            expect(response.body.payload).to.have.property(
                "_id",
                testAdoptionId
            )
        })
        it("debe fallar si la adopcion no existe", async () => {
            const idAdoptionTrucho = "507f1f77bcf86cd799439011"
            const response = await request.get(
                `/api/adoptions/${idAdoptionTrucho}`
            )
            expect(response.status).to.equal(404)
            expect(response.body).to.have.property("status", "error")
            expect(response.body).to.have.property(
                "error",
                "Adoption not found"
            )
        })
    })

    after(async () => {
        try {
            if (testUserId) {
                await request.delete(`/api/users/${testUserId}`)
                logger.info(` test : usuario ${testUserId} eliminado`)
            }
            if (testUserId2) {
                await request.delete(`/api/users/${testUserId2}`)
                logger.info(` test : usuario ${testUserId2} eliminado`)
            }

            if (testPetId) {
                await request.delete(`/api/pets/${testPetId}`)
                logger.info(` test : mascota ${testPetId} eliminada`)
            }
            logger.info("Test completado")
        } catch (error) {
            logger.fatal("Error en cleanup:", error.message)
        }
    })
})
