import { Router } from "express"
import { generateMockPet } from "../mocks/pet.mock.js"
import { generateMockUser } from "../mocks/user.mock.js"
import petModel from "../dao/models/Pet.js"
import userModel from "../dao/models/User.js"

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

router.get("/mockingUsers", async (req, res) => {
    let { cantidad = 50, grabar = 0 } = req.query

    let usuarios = []
    
    for (let i = 0; i < cantidad; i++) {
        usuarios.push(await generateMockUser())
        
    }

    if (grabar) {
        usuarios = await userModel.insertMany(usuarios)
    }

    res.setHeader("Content-Type", "application/json")
    res.status(200).json({ status: "success", payload: usuarios })
})

router.post("/generateData", async (req, res) => {
    const { users = 0, pets = 0 } = req.body

    let usuariosArray = []
    let mascotasArray = []
    
    for (let i = 0; i < users; i++) {
        usuariosArray.push(await generateMockUser())
    }

    for (let i = 0; i < pets; i++) {
        mascotasArray.push(generateMockPet())
    }
    
    const usuariosDB = await userModel.insertMany(usuariosArray)
    const mascotasDB = await petModel.insertMany(mascotasArray)
    
    
    res.setHeader("Content-Type", "application/json")
    res.status(200).json({
        status: "success",
        lenght: { usersCreated: usuariosDB.length, petsCreated: mascotasDB.length },
        payload: { usersEnDB: usuariosDB, petsEnDB: mascotasDB  },
    })
})

export default router
