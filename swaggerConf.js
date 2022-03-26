const swaggerDefinition = {
    "swagger": "2.0",
    "info": {
        "title": "ITESO Chat API",
        "description": "A live chat web application",
        "version": "1.0.0",
        "servers": ["http://localhost:3000"]
    }
}

module.exports = {
    swaggerDefinition,
    "apis": ['./src/modules/*/*.routes.js']
}