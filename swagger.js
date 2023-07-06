const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Virtual Tour API',
            version: '1.0.0',
            description: 'API documentation for the Virtual Tour application',
        },
    },
    apis: ['./endpoints/areas.js', './endpoints/campuses.js', './endpoints/images.js', './endpoints/points.js', './endpoints/pointtypes.js', './endpoints/rooms.js'], // Specify the file(s) where your routes are defined
};

const specs = swaggerJSDoc(options);

module.exports = {
    serveSwaggerUI: swaggerUi.serve,
    setupSwaggerUI: swaggerUi.setup(specs),
};
