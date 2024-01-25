const { Router } = require('express')
const auth = require('./auth.routes')
const character = require('../routes/character.routes')




const route = Router()

route.use('/character', character)
route.use('/auth', auth)


module.exports = route