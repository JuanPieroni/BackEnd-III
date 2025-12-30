import {
    adoptionsService,
    petsService,
    usersService,
} from "../services/index.js"
import { logger } from "../utils/winston.js"

const getAllAdoptions = async (req, res) => {
    const result = await adoptionsService.getAll()
    res.send({ status: "success", payload: result })
}

const getAdoption = async (req, res) => {
    const adoptionId = req.params.aid
    const adoption = await adoptionsService.getBy({ _id: adoptionId })
    if (!adoption)
        return res
            .status(404)
            .send({ status: "error", error: "Adoption not found" })
    res.send({ status: "success", payload: adoption })
}

const createAdoption = async (req, res) => {
    try {
        const { uid, pid } = req.params
        const user = await usersService.getUserById(uid)
        if (!user) {
            logger.warning(`Usuario no encontrado para adopcion: ${uid}`)
            return res
                .status(404)
                .send({ status: "error", error: "user Not found" })
        }
        const pet = await petsService.getBy({ _id: pid })
        if (!pet) {
            logger.warning(`Mascota no encontrada para adopcion: ${pid}`)
            return res
                .status(404)
                .send({ status: "error", error: "Pet not found" })
        }
        if (pet.adopted) {
            logger.warning(`Mascota ya adoptada: ${pid}`)
            return res
                .status(400)
                .send({ status: "error", error: "mascota ya adoptada" })
        }
        user.pets.push(pet._id)
        await usersService.update(user._id, { pets: user.pets })
        await petsService.update(pet._id, { adopted: true, owner: user._id })
        await adoptionsService.create({ owner: user._id, pet: pet._id })
        logger.info(
            `Mascota adoptada exitosamente: Usuario: ${uid}, Mascota: ${pid}`
        )
        res.send({ status: "success", message: "Pet adopted" })
    } catch (error) {
        logger.fatal("Error adoptando mascota:", error.message)
        res.status(500).send({
            status: "error",
            error: "Internal server error",
        })
    }
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption,
}
