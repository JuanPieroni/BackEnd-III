import dotenv from "dotenv"

dotenv.config({
    quiet: true,
})

export default {
    environment: process.env.ENVIRONMENT,
}
