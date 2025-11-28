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
        /* console.log(`${mascotas.length} mascotas guardatas en DB`) */
   
    }

    res.setHeader("Content-Type", "application/json")
    res.status(200).json({ status: "success", payload: mascotas })
})

router.get("/mockingUsers", async (req, res) => {
    let { cantidad = 50, grabar = 0 } = req.query
    console.log(`Generando usuarios... cantidad : ${cantidad} `)

    let usuarios = []

    for (let i = 0; i < cantidad; i++) {
        usuarios.push(await generateMockUser())
    }

    if (grabar) {
        usuarios = await userModel.insertMany(usuarios)
        console.log(`${usuarios.length} usuarios agregados a DB`)
    }

    res.setHeader("Content-Type", "application/json")
    res.status(200).json({ status: "success", payload: usuarios })
})

router.post("/generateData", async (req, res) => {
    const { users = 0, pets = 0 } = req.body
    console.log(`Generando ${users} usuarios y ${pets} mascotas.....`)

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

    const totalUsers = await userModel.countDocuments()
    const totalPets = await petModel.countDocuments()

    console.log(
        `Insertados: ${usuariosDB.length} usuarios, ${mascotasDB.length} mascotas`
    )
    console.log(` Total en DB: ${totalUsers} usuarios, ${totalPets} mascotas`)

    res.setHeader("Content-Type", "application/json")
    res.status(200).json({
        status: "success",
        agregados: {
            usersCreated: usuariosDB.length,
            petsCreated: mascotasDB.length,
        },
        totalEnDB: { totalUsers, totalPets },
        payload: { usersEnDB: usuariosDB, petsEnDB: mascotasDB },
    })
})

export default router
