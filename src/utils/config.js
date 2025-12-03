import dotenv from "dotenv"

dotenv.config({
    quiet: true,
})

export default {
    environment: process.env.ENVIRONMENT,
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGO_URI,
}
