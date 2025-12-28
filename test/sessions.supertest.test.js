import supertest from "supertest"
import { expect } from "chai"

const request = supertest("http://localhost:8080")

describe("Sessions endpoints", () => {
    let cookie
    const mockUser = {
        first_name: "Test",
        last_name: "User",
        email: `test${Date.now()}@test.com`,
        password: "password123"
    }

    describe("POST /api/sessions/register - Registrar nuevo usuario", () => {
        it("debe registrar un usuario correctamente", async () => {
            const response = await request.post("/api/sessions/register").send(mockUser)

            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal("success")
        })
    })

    describe("POST /api/sessions/login - Autenticar usuario y obtener cookie", () => {
        it("debe hacer login y recibir una cookie", async () => {
            const loginResponse = await request
                .post("/api/sessions/login")
                .send({ email: mockUser.email, password: mockUser.password })

            expect(loginResponse.status).to.equal(200)
            expect(loginResponse.headers["set-cookie"]).to.exist

            cookie = loginResponse.headers["set-cookie"]
        })
    })

    describe("GET /api/sessions/current - Obtener usuario actual con cookie", () => {
        it("debe obtener el usuario actual con la cookie", async () => {
            const response = await request
                .get("/api/sessions/current")
                .set("Cookie", cookie)

            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal("success")
            expect(response.body.payload).to.have.property("email")
        })
    })
})
