
const charHandler = require('../handlers/characterHandler')
const Router = require('express')
const character = Router()

character.get('/', [charHandler.getChar])
character.get('/:id', [charHandler.getCharById])
character.put('/:id', [charHandler.updateChar])
character.post('/', [charHandler.createChar])
character.delete('/:id', [charHandler.removeChar])



module.exports = character;