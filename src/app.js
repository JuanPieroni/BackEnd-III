import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import config from "./utils/config.js"

import usersRouter from "./routes/users.router.js"
import petsRouter from "./routes/pets.router.js"
import adoptionsRouter from "./routes/adoption.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import mocksRouter from "./routes/mocks.router.js"

import { logger } from "./utils/winston.js"
import cluster from "cluster"
import { cpus } from "os"

const app = express()
const PORT = config.port

mongoose.connect(config.mongoUri)
    .then(() => logger.information("MongoDB conectado exitosamente"))
    .catch((error) => logger.error(`Error conectando a MongoDB: ${error.message}`))

app.use(express.json())
app.use(cookieParser())

/* 
 LOGGER EJEMPLO

app.get("/", (req, res) => {
    console.log("probando logs")
    logger.information("Probando winston.")
    logger.warning("Probando winston.")
    logger.fatal("Probando winston.")
    logger.info("Mensaje de info")
    logger.error("error")
    logger.warn("advertencia")
    logger.http("mensaje http")
    logger.debug("mensaje debug")
    logger.silly("mensaje silly")
    logger.verbose("mensaje verbose")
    res.send("Probando winston.")
    }) */

/* ARTILLERY  EJEMPLO

app.get("/sencilla", (req, res) => {
    let suma = 0
    for (let i = 0; i < 1000000; i++) {
        
    suma+=i 
    }
    res.send({suma})
    })
   
    
    app.get("/compleja", (req, res)=> {
        let suma = 0 
        for (let i = 0; i < 5e8; i++) {
            suma+= i
            }
            res.send({suma })
            })
 */
app.use("/api/users", usersRouter)
app.use("/api/pets", petsRouter)
app.use("/api/adoptions", adoptionsRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/api/mocks", mocksRouter)

// TODO : USAR PM2 PARA CLUSTERIZAR EN PRODUCCION
// TODO: CLUSTER PARA DESARROLLO

/*  
if (cluster.isPrimary) {
    console.log(cluster.isPrimary, process.pid)
    for (let i = 0; i < cpus().length; i++) {
        cluster.fork()
    }
    cluster.on("exit", (worker) => {
        console.log(
            `proceso ${worker.process.pid} ha muerto. comenzando uno nuevo...`
        )
        cluster.fork()
    })
} else {
    app.get("/compleja", (req, res) => {
        let suma = 0
        for (let i = 0; i < 5e8; i++) {
            suma += i
        }
        res.send({ suma })
    })
    app.listen(PORT, () =>
        logger.information(`Listening on ${PORT} - PID WORKER ${process.pid}`)
    )
}
*/

 
app.get("/compleja", (req, res) => {
    let suma = 0
    for (let i = 0; i < 5e8; i++) {
        suma += i
    }
    res.send({ suma })
})

app.listen(PORT, () =>
    logger.information(`Listening on ${PORT} - PID ${process.pid}`)
)
