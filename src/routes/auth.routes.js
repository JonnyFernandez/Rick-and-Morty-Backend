const { Router } = require('express')
const { registerSchema, loginSchema } = require('../schemas/auth.schema')
const validateSchema = require('../middlewares/validator.Middleware')
const handler = require('../handlers/authHandler')
const validateToken = require('../middlewares/validateToken')


const auth = Router()



auth.post('/register', validateSchema(registerSchema), [handler.register])
auth.post('/login', validateSchema(loginSchema), [handler.login])
auth.post('/loguot', [handler.logout])
auth.get('/profile', [validateToken.authRequire], [handler.profile])
auth.get('/verify', [handler.verifyToken])




module.exports = auth;