


const charHandler = require('../handlers/characterHandler')
const Router = require('express')
const { postCharSchema } = require('../schemas/char.schema')
const validateSchema = require('../middlewares/validator.Middleware')
const validateToken = require('../middlewares/validateToken')
const character = Router()

character.get('/', [validateToken.authRequire], [charHandler.getChar])
character.get('/:id', [charHandler.getCharById])
character.put('/:id', [validateToken.authRequire], [charHandler.updateChar])
character.post('/', [validateToken.authRequire], validateSchema(postCharSchema), [charHandler.createChar])
character.delete('/:id', [validateToken.authRequire], [charHandler.removeChar])



module.exports = character;