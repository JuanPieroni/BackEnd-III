import { usersService } from "../services/index.js"
import { logger } from "../utils/winston.js"

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAll()
        logger.info(`Se obtuvieron ${users.length} usuarios`, { users })
        res.send({ status: "success", payload: users })
    } catch (error) {
        logger.fatal("Error al obtener usuarios", error.message)
        res.status(500).send({
            status: "error",
            error: "Error interno del servidor",
        })
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.params.uid
        const user = await usersService.getUserById(userId)
        if (!user) {
            logger.warning(`Usuario no encontrado: ${userId}`)
            return res
                .status(404)
                .send({ status: "error", error: "User not found" })
        }
        logger.info(`Usuario obtenido exitosamente: ${userId}`)
        res.send({ status: "success", payload: user })
    } catch (error) {
        logger.fatal("Error obteniendo usuario:", error.message)
        res.status(500).send({
            status: "error",
            error: "Internal server error",
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const updateBody = req.body
        const userId = req.params.uid
        const user = await usersService.getUserById(userId)
        if (!user) {
            logger.warning(`Usuario no encontrado para actualizar: ${userId}`)

            return res
                .status(404)
                .send({ status: "error", error: "User not found" })
        }

        const result = await usersService.update(userId, updateBody)
        res.send({ status: "success", message: "User updated" })
    } catch (error) {
        logger.fatal("Error actualizando usuario:", error.message)
        res.status(500).send({
            status: "error",
            error: "Internal server error",
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.uid
        const result = await usersService.getUserById(userId)
        if (!result) {
            logger.warning(`Usuario no encontrado para eliminar: ${userId}`)
            return res
                .status(404)
                .send({ status: "error", error: "User not found" })
        }
        await usersService.delete(userId)
        logger.info(`Usuario eliminado exitosamente: ${userId}`)

        res.send({ status: "success", message: "User deleted" })
    } catch (error) {
        logger.fatal("Error eliminando usuario:", error.message)
        res.status(500).send({
            status: "error",
            error: "Internal server error",
        })
    }
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
}
