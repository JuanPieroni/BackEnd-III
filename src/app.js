import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

import usersRouter from "./routes/users.router.js"
import petsRouter from "./routes/pets.router.js"
import adoptionsRouter from "./routes/adoption.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import mocksRouter from "./routes/mocks.router.js"

import { logger } from "./utils/winston.js"

const app = express()
const PORT = process.env.PORT || 8080
const connection = mongoose.connect(
    `mongodb+srv://SeisDuro:Atlgla36%2A@cluster0.bvo0gcz.mongodb.net/AdoptMe?retryWrites=true&w=majority`
)

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    /*  console.log("probando logs") */
     logger.information("Probando winston.")
    logger.warning("Probando winston.")
    logger.fatal("Probando winston.")  
    /*   logger.info("Mensaje de info")
    logger.error("error")
    logger.warn("advertencia")
    logger.http("mensaje http")
    logger.debug("mensaje debug")
    logger.silly("mensaje silly")
    logger.verbose("mensaje verbose") */
    res.send("Probando winston.")
})

app.use("/api/users", usersRouter)
app.use("/api/pets", petsRouter)
app.use("/api/adoptions", adoptionsRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/api/mocks", mocksRouter)

app.listen(PORT, () => logger.information(`Listening on ${PORT}`))
