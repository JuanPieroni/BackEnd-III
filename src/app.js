import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import config from "./utils/config.js"

import usersRouter from "./routes/users.router.js"
import petsRouter from "./routes/pets.router.js"
import adoptionsRouter from "./routes/adoption.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import mocksRouter from "./routes/mocks.router.js"

import swaggerUi from "swagger-ui-express"
import { swaggerSetup } from "./utils/swagger.js"
import { logger } from "./utils/winston.js"

const app = express()
const PORT = config.port

mongoose
    .connect(config.mongoUri)
    .then(() => logger.info("MongoDB conectado exitosamente"))
    .catch((error) =>
        logger.fatal(`Error conectando a MongoDB: ${error.message}`)
    )

app.use(express.json())
app.use(cookieParser())

app.use("/api/users", usersRouter)
app.use("/api/pets", petsRouter)
app.use("/api/adoptions", adoptionsRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/api/mocks", mocksRouter)

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup))

app.get("/compleja", (req, res) => {
    let suma = 0
    for (let i = 0; i < 5e8; i++) {
        suma += i
    }
    res.send({ suma })
})

app.listen(PORT, () =>
    logger.info(`Listening on ${PORT} - PID ${process.pid}`)
)
