


const Router = require('express')
const charHandler = require('../handlers/characterHandler')
const { postCharSchema } = require('../schemas/char.schema')
const validateSchema = require('../middlewares/validator.Middleware')
const validateToken = require('../middlewares/validateToken')
const character = Router()

character.get('/', [validateToken.authRequire], [charHandler.getChar])
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