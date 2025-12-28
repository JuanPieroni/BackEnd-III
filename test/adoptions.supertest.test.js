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
            const testUserId2 = userResponse2.body.payload

            const response = await request.post(
                `/api/adoptions/${testUserId2}/${testPetId}`
            )
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property("status", "error")
            expect(response.body).to.have.property("error", "mascota adopatada")
        })
    })

    describe("Get /api/adoptions/:aid get una adoption por id ", () => {})
    //todo 
    //todo poner un before aca 
    //todo testear que sean id validos , en owner y pet
})
