const { Router } = require('express');
const handle = require('../handlers/characterHandler');
const validateToken = require('../middlewares/validateToken');
const { favSchema } = require('../schemas/fav.schema');
const validateSchema = require('../middlewares/validator.Middleware');

const fav = Router();

// -----------------------------POST-FAV----------------------------------------------------------
/**
 * @swagger
 * components:
 *   schemas:
 *     favSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         status:
 *           type: string
 *         species:
 *           type: string
 *         gender:
 *           type: string
 *         origin:
 *           type: string
 *         image:
 *           type: string
 *         code:
 *           type: string
 *       required:
 *         - name
 *         - status
 *         - species
 *         - gender
 *         - origin
 *         - image
 *         - code
 */
/**
 * @swagger
 * /api/fav:
 *   post:
 *     summary: Crear personaje favorito
 *     description: Crea un nuevo usuario en la DB/ tener en cuenta el que code a ingresar, es el id del personaje que queremos guardar en favorito.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/favSchema'
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud o usuario ya existente
 */
fav.post('/', [validateToken.authRequire], validateSchema(favSchema), [handle.fav])
// -----------------------------GET-FAV----------------------------------------------------------
/**
 * @swagger
 * /api/fav:
 *   get:
 *     summary: Obtener todos los personajes
 *     description: Obtiene todos los personajes de la base de datos.
 *     responses:
 *       200:
 *         description: Lista de personajes obtenida exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */
fav.get('/', [validateToken.authRequire], [handle.getFav])
// -----------------------------REMOVE-CHAR----------------------------------------------------------
/**
 * @swagger
 * /api/fav/{id}:
 *   delete:
 *     summary: Eliminar un favorito de la DB por ID 
 *     description: Elimina un favorito de la base de datos según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del favorito que se va a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Personaje eliminado exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */
fav.delete('/:id', [validateToken.authRequire], [handle.removeFav])

module.exports = fav