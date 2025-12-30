import { Router } from "express"
import { generateMockPet } from "../mocks/pet.mock.js"
import { generateMockUser } from "../mocks/user.mock.js"
import { logger } from "../utils/winston.js"
import { petsService, usersService } from "../services/index.js"

const router = Router()

router.get("/mockingpets", async (req, res) => {
    let { cantidad = 100, grabar = 0 } = req.query

    let mascotas = []
    for (let i = 0; i < cantidad; i++) {
        mascotas.push(generateMockPet())
    }

    if (grabar) {
        mascotas = await Promise.all(
            mascotas.map((mascota) => petsService.create(mascota))
        )
        logger.info(`${mascotas.length} mascotas guardatas en DB`)
    }

    res.setHeader("Content-Type", "application/json")
    res.status(200).json({ status: "success", payload: mascotas })
})

router.get("/mockingUsers", async (req, res) => {
    let { cantidad = 50, grabar = 0 } = req.query
    logger.info(`Generando usuarios... cantidad : ${cantidad} `)

    let usuarios = []

    for (let i = 0; i < cantidad; i++) {
        usuarios.push(await generateMockUser())
    }

    if (grabar) {
        usuarios = await Promise.all(
            usuarios.map((usuario) => usersService.create(usuario))
        )
        logger.info(`${usuarios.length} usuarios agregados a DB`)
    }

    res.setHeader("Content-Type", "application/json")
    res.status(200).json({ status: "success", payload: usuarios })
})

router.post("/generateData", async (req, res) => {
    const { users = 0, pets = 0 } = req.body
    logger.info(`Generando ${users} usuarios y ${pets} mascotas.....`)

    let usuariosArray = []
    let mascotasArray = []

    for (let i = 0; i < users; i++) {
        usuariosArray.push(await generateMockUser())
    }

    for (let i = 0; i < pets; i++) {
        mascotasArray.push(generateMockPet())
    }

    const usuariosDB = await Promise.all(
        usuariosArray.map((usuario) => usersService.create(usuario))
    )
    const mascotasDB = await Promise.all(
        mascotasArray.map((mascota) => petsService.create(mascota))
    )

    const allUsers = await usersService.getAll()
    const allPets = await petsService.getAll()
    const totalUsers = allUsers.length
    const totalPets = allPets.length

    logger.info(
        `Insertados: ${usuariosDB.length} usuarios, ${mascotasDB.length} mascotas`
    )
    logger.info(` Total en DB: ${totalUsers} usuarios, ${totalPets} mascotas`)

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
