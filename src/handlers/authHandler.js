const auth = require('../controllers/Auth/Auth.controllers');
const { createAccesToken } = require('../utils/jwt');


module.exports = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const aux = await auth.register(username, email, password)
            const token = await createAccesToken({ id: aux.id })
            res.cookie('token', token)
            res.status(201).json(aux)

        } catch (error) {
            res.status(500).json({ message: [error.message] })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const aux = await auth.login(email, password)
            const token = await createAccesToken({ id: aux.id })
            res.cookie('token', token)
            res.status(201).json(aux)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    logout: (req, res) => {
        res.cookie('toke', '', {
            expires: new Date(0)
        })
        return res.status(200).send('Logout')
    },
    profile: async (req, res) => {
        try {
            const aux = await auth.profile(req.user.id)
            return res.status(201).json(aux)
        } catch (error) {
            return res.status(400).json({ message: "problem wit your profile" })
        }
    },
    verifyToken: async (req, res) => {
        const { token } = req.cookies
        if (!token) return res.status(401).json({ message: "Unauthorized/not cookie" })
        try {
            const aux = await auth.verifyToken(token)
            res.status(200).json(aux)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
};

