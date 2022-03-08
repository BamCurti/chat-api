//dependencies
const express = require('express');
const fs = require('fs');

//swagger dependencies
const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//imports
const apiRoutes = require('./src/routes');
const db = require('./src/core/db');
const swaggerConf = require('./swaggerConf');

//init app
const app = express();

//swagger config
const swaggerSpec = swaggerJsDocs(swaggerConf);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//set endpoint
app.get('/', (req, res) => {
    res.send('api works!');
});

//set api endpoint
app.use('/api', apiRoutes);

db.connect()
.then((client) => {
    console.log(`Client ${client} is connected to Mongo!`);
})

//list to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})