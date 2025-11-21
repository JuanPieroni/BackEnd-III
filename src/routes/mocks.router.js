import { Router } from "express"
import { generateMockPet } from "../mocks/pet.mock.js"
import petModel from "../dao/models/Pet.js"

const router = Router()

router.get("/mockingpets", async (req, res) => {
    let { cantidad = 100, grabar = 0 } = req.query

    let mascotas = []

    for (let i = 0; i < cantidad; i++) {
        mascotas.push(generateMockPet())
    }

    if (grabar) {
        mascotas = await petModel.insertMany(mascotas)
    }

    res.setHeader("Content-Type", "application/json")
    res.status(200).json({ status: "success", payload: mascotas })
})

router.get("mockingUsers", async (req, res) => {})
router.post("/generateData", async (req, res) => {})

export default router
