//dependencies
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

//swagger dependencies
const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//imports
const apiRoutes = require('./src/routes');
const db = require('./src/core/db');
const swaggerConf = require('./swaggerConf');
const { errorHandler, boomErrorHandler } = require('./src/core/middleware/error.handler');

//init app
const app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//swagger config
const swaggerSpec = swaggerJsDocs(swaggerConf);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//set api endpoint
app.use('/api', apiRoutes);
require('./src/auth');


//set error handler
app.use(boomErrorHandler);
app.use(errorHandler);

db.connect()
.then((client) => {
    console.log('DB connected');
})

//list to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})