import winston from "winston"
import config from "./config.js"

const customLevels = {
    levels: {
        fatal: 0,
        warning: 1,
        info: 2,
    },
    colors: {
        fatal: "red",
        warning: "yellow",
        info: "green",
    },
}
 

export let logger

if (config.environment === "production") {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.File({
                filename: "./prodLogs.log",
                level: "warning",
                format: winston.format.combine(
                    winston.format.timestamp({ format: "MM-DD HH:mm:ss" }),
                    winston.format.prettyPrint()
                ),
            }),
            new winston.transports.Console({
                level: "info",
                format: winston.format.combine(
                    winston.format.timestamp({ format: "MM-DD HH:mm:ss" }),
                    winston.format.colorize({ colors: customLevels.colors }),
                    winston.format.simple()
                ),
            }),
        ],
    })
} else {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: "info",
                format: winston.format.combine(
                    winston.format.timestamp({ format: "MM-DD HH:mm:ss" }),
                    winston.format.colorize({ colors: customLevels.colors }),
                    winston.format.simple()
                ),
            }),
        ],
    })
}
