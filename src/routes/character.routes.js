const Router = require('express')
const charHandler = require('../handlers/characterHandler')
const { postCharSchema } = require('../schemas/char.schema')
const validateSchema = require('../middlewares/validator.Middleware')
const validateToken = require('../middlewares/validateToken')
const character = Router()



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
character.get('/:id', [validateToken.authRequire], [charHandler.getCharById])
character.put('/:id', [validateToken.authRequire], [charHandler.updateChar])
character.post('/', [validateToken.authRequire], validateSchema(postCharSchema), [charHandler.createChar])
character.delete('/:id', [validateToken.authRequire], [charHandler.removeChar])



module.exports = character;