const jwt = require('jsonwebtoken')
require('dotenv').config()
const { TOKEN_SECRET } = process.env;


module.exports = {
    authRequire: (req, res, next) => {
        const { token } = req.cookies
        try {
            if (!token) return res.status(401).json({ message: 'Unauthorized/Not token' })

            jwt.verify(token, TOKEN_SECRET, (err, user) => {
                if (err) return res.status(403).json({ message: "Invalid Token" })
                req.user = user

            })
            next()

        } catch (error) {
            console.log(error);
        }
    }
}