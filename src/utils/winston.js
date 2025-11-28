import winston from "winston"
import config from "./config.js"

const customLevels = {
    levels: {
        fatal: 0,
        warning: 1,
        information: 2,
    },
    colors: {
        fatal: "red",
        warning: "yellow",
        information: "green",
    },
}
/* export const logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            level: "information",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevels.colors }),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: "./logs/errors.log",
            level: "information",
            format: winston.format.combine(
                winston.format.timestamp({ format: "MM-DD HH:mm:ss" }),
                winston.format.prettyPrint()
            ),
        }),
    ],
}) */

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
        ],
    })
} else {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: "information",
                format: winston.format.combine(
                    winston.format.timestamp({ format: "MM-DD HH:mm:ss" }),
                    winston.format.colorize({ colors: customLevels.colors }),
                    winston.format.simple()
                ),
            }),
        ],
    })
}
