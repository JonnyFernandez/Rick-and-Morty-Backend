const { getChar, getCharById, updateChar, createChar, removeChar } = require('../handlers/characterHandler')

const Router = require('express')
const character = Router()

character.get('/', getChar)
character.get('/:id', getCharById)
character.put('/:id', updateChar)
character.post('/', createChar)
character.delete('/:id', removeChar)



module.exports = character;