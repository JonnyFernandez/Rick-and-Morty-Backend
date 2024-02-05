const { Router } = require('express');
const handle = require('../handlers/characterHandler');
const validateToken = require('../middlewares/validateToken');

const routeDB = Router();

// -----------------------------GET-RANDOM----------------------------------------------------------
/**
 * @swagger
 * /api/mychars/random:
 *   get:
 *     summary: Obtener un arreglo de 5 personajes aleatorios 
 *     description: Obtiene 5 persojes distintos en cada reques.
 *     responses:
 *       200:
 *         description: Lista de personajes obtenida exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */
routeDB.get('/random', [validateToken.authRequire], [handle.random]);

// -----------------------------GET-ALL FROM DB----------------------------------------------------------
/**
 * @swagger
 * /api/mychars/char:
 *   get:
 *     summary: Obtener un arreglo de personajes en tu DB
 *     description: Obtiene todos los personajes registrados.
 *     responses:
 *       200:
 *         description: Lista de personajes obtenida exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */
routeDB.get('/char', [validateToken.authRequire], [handle.myChar]);

// -----------------------------UPDATE-CHAR----------------------------------------------------------
/**
 * @swagger
 * /api/mychars/{id}:
 *   put:
 *     summary: Actualizar un personaje por ID
 *     description: Actualiza un personaje en la base de datos según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del personaje que se va a actualizar
 *         schema:
 *           type: string
 *       - in: body
 *         name: charUpdate
 *         description: Datos actualizados del personaje
 *         required: false
 *         example:
 *           name: Nuevo Nombre
 *           status: Muerto
 *           species: Alien
 *           gender: Female
 *           origin: Nueva Origen
 *           image: Nueva Imagen
 *     responses:
 *       200:
 *         description: Personaje actualizado exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */

routeDB.put('/:id', [validateToken.authRequire], [handle.updateChar]);


// -----------------------------REMOVE-CHAR----------------------------------------------------------
/**
 * @swagger
 * /api/mychars/{id}:
 *   delete:
 *     summary: Eliminar un personaje por ID
 *     description: Elimina un personaje de la base de datos según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del personaje que se va a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Personaje eliminado exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */
routeDB.delete('/:id', [validateToken.authRequire], [handle.removeChar]);

module.exports = routeDB;
