const { Router } = require('express');
const handle = require('../handlers/characterHandler');
const validateToken = require('../middlewares/validateToken');

const fav = Router();



fav.post('/', [validateToken.authRequire], [handle.fav])
fav.get('/', [validateToken.authRequire], [handle.getFav])
fav.delete('/:id', [validateToken.authRequire], [handle.removeFav])

module.exports = fav