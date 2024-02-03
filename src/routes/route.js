const { Router } = require('express')
const auth = require('./auth.routes')
const character = require('../routes/character.routes')
const routeDB = require('../routes/random.routes')
const fav = require('../routes/fav.routes')


const route = Router()

route.use('/char', character)
route.use('/auth', auth)
route.use('/fav', fav)
route.use('/mychars', routeDB)


module.exports = route