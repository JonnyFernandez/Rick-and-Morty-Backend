const { Router } = require('express');
const handle = require('../handlers/characterHandler');
const validateToken = require('../middlewares/validateToken');

const routeDB = Router();


routeDB.get('/random', [validateToken.authRequire], [handle.random])
routeDB.get('/char', [validateToken.authRequire], [handle.myChar])
routeDB.put('/:id', [validateToken.authRequire], [handle.updateChar])
routeDB.delete('/:id', [validateToken.authRequire], [handle.removeChar])


module.exports = routeDB