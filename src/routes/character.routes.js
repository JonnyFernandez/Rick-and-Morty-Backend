const Router = require('express')
const charHandler = require('../handlers/characterHandler')
const { postCharSchema } = require('../schemas/char.schema')
const validateSchema = require('../middlewares/validator.Middleware')
const validateToken = require('../middlewares/validateToken')
const character = Router()





// -----------------------------POST-CHAR----------------------------------------------------------
// Esquema para la validación creacion de personajes
/**
 * @swagger
 * components:
 *   schemas:
 *     postCharSchema:
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
 *       required:
 *         - name
 *         - status
 *         - species
 *         - gender
 *         - origin
 *         - image
 */
/**
 * @swagger
 * /api/char:
 *   post:
 *     summary: Crear personaje
 *     description: Crea un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postCharSchema'
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud o usuario ya existente
 */
character.post('/', [validateToken.authRequire], validateSchema(postCharSchema), [charHandler.createChar])


// -----------------------------GET-CHAR----------------------------------------------------------
/**
 * @swagger
 * /api/char:
 *   get:
 *     summary: Obtener todos los personajes
 *     description: Obtiene todos los personajes registrados.
 *     responses:
 *       200:
 *         description: Lista de personajes obtenida exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */
character.get('/', [validateToken.authRequire], [charHandler.getChar]);

// -----------------------------GET-CHAR-BY-ID----------------------------------------------------------
/**
 * @swagger
 * /api/char/{id}:
 *   get:
 *     summary: Obtener personaje por su id
 *     description: Obtener personaje por su id.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Identificador del personaje (puede ser número entero o cadena)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Personaje obtenido exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */

character.get('/:id', [validateToken.authRequire], [charHandler.getCharById])

/**
 * @swagger
 * /characters/paginate/{id}:
 *   get:
 *     summary: Obtener personajes paginados
 *     description: Obtiene una página específica de personajes.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Número de página
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Página de personajes obtenida exitosamente
 *       401:
 *         description: No autorizado (Token no válido)
 */
character.get('/paginate/:id', [validateToken.authRequire], [charHandler.paginate])
character.get('/mychar', [validateToken.authRequire], [charHandler.myChar])
character.get('/random', [validateToken.authRequire], [charHandler.random])
character.post('/favorite', [validateToken.authRequire], [charHandler.fav])
character.get('/favorite', [validateToken.authRequire], [charHandler.getFav])
character.delete('/favorite/:id', [validateToken.authRequire], [charHandler.removeFav])

character.put('/:id', [validateToken.authRequire], [charHandler.updateChar])

character.delete('/:id', [validateToken.authRequire], [charHandler.removeChar])



module.exports = character;