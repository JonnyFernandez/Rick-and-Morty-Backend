const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('../routes/auth.routes.js')
const path = require('path');


const options = {
    definition: {
        openapi: '3.0.0', // Especificación OpenAPI
        info: {
            title: 'Nombre de tu API',
            version: '1.0.0',
            description: 'Descripción de tu API',
        },
    },
    // Rutas a los archivos que contienen comentarios de Swagger
    apis: [
        path.join(__dirname, '../routes/character.routes.js'),
        path.join(__dirname, '../routes/auth.routes.js')
    ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
