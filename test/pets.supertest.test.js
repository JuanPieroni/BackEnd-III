import supertest from "supertest"
import { expect } from "chai"

const request = supertest("http://localhost:8080")

describe("Pets endpoints", () => {
    describe("POST /api/pets", () => {
        it("debe crear pet con propiedad adopted false", async () => {
            const mockPet = {
                name: "tortuguita",
                specie: "anfibio",
                birthDate: "2020-01-01",
            }

            const response = await request.post("/api/pets").send(mockPet)

            expect(response.status).to.equal(200)
            expect(response.body.payload).to.have.property("adopted", false)
        })

        it("debe responder con status 400 si falta el nombre", async () => {
            const mockPet = {
                specie: "Cat",
                birthDate: "2021-01-01",
            }

            const response = await request.post("/api/pets").send(mockPet)

            expect(response.status).to.equal(400)
        })
    })

    describe("GET /api/pets", () => {
        it("debe tener status y payload, y payload debe ser array", async () => {
            const response = await request.get("/api/pets")

            expect(response.body).to.have.property("status")
            expect(response.body).to.have.property("payload")
            expect(response.body.payload).to.be.an("array")
        })
    })

    describe("PUT /api/pets/:pid", () => {
        it("debe actualizar correctamente una mascota", async () => {
            const mockPet = {
                name: "UpdateTest",
                specie: "gato",
                birthDate: "2022-01-01",
            }
            const created = await request.post("/api/pets").send(mockPet)
            const petId = created.body.payload._id

            const update = { name: "UpdatedName" }
            await request.put(`/api/pets/${petId}`).send(update)

            const pets = await request.get("/api/pets")
            const updatedPet = pets.body.payload.find((p) => p._id === petId)

            expect(updatedPet.name).to.equal("UpdatedName")
        })
    })

    describe("DELETE /api/pets/:pid", () => {
        it("debe borrar la mascota agregada", async () => {
            const mockPet = {
                name: "DeleteTest",
                specie: "canario",
                birthDate: "2023-01-01",
            }
            const created = await request.post("/api/pets").send(mockPet)
            const petId = created.body.payload._id

            await request.delete(`/api/pets/${petId}`)

            const pets = await request.get("/api/pets")
            const deletedPet = pets.body.payload.find((p) => p._id === petId)

            expect(deletedPet).to.be.undefined
        })
    })
})
