import { expect } from "chai"
import supertest from "supertest"

const request = supertest("http://localhost:8080")

describe("adoptions endopoints", () => {
    let testUserId
    let testPetId
    let testAdoptionId

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
})
