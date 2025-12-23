import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import __dirname from "./index.js";

const swaggerOptions = {
    definition: {
        openapi: "3.1.1",
        info: {
            title: "AdoptMe API",
            version: "1.0.0",
            description: "Proyecto CoderHouse",
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};