const swaggerDefinition = {
    swagger: "2.0",
    info: {
        title: "ITESO Chat API",
        description: "A live chat web application",
        version: "1.0.0",
        servers: ["http://localhost:3000"]
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                description: "JWT Authorization header using the Bearer scheme.",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    }
}

module.exports = {
    swaggerDefinition,
    "apis": ['./src/modules/*/*.routes.js'],
    security: [
        {
            bearerAuth: []
        }
    ]
}