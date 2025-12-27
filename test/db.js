import mongoose from "mongoose"
import config from "../src/utils/config.js"

export const connectDB = async () => {
    await mongoose.connect(config.mongoUri)
}

export const disconnectDB = async () => {
    await mongoose.connection.close()
}
