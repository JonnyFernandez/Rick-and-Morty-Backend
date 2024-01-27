

const control = require('../controllers/characterCtrl.js')


module.exports = {
    getChar: async (req, res) => {
        const { name } = req.query;
        try {
            const char = await control.getChar(name, req.user.id)
            res.status(200).json(char)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    getCharById: async (req, res) => {
        const { id } = req.params;
        try {
            let charID = await control.getChar_by_id(id)
            res.status(200).json(charID)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    createChar: async (req, res) => {
        const { name, status, species, gender, origin, image } = req.body;
        const user = req.user.id
        try {
            let charCreate = await control.postChar(name, status, species, gender, origin, image, user)
            res.status(200).json(charCreate)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    updateChar: async (req, res) => {
        const { id } = req.params;
        try {
            let charUpdate = await control.update_character(id, req.body, req.user.id)
            res.status(200).json(charUpdate)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    removeChar: async (req, res) => {
        const { id } = req.params;
        try {
            let charUpdate = await control.remove(id, req.user.id)
            res.status(200).json(charUpdate)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    paginate: async (req, res) => {
        try {
            const aux = await control.paginate(req.params.id)
            res.status(200).json(aux)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    myChar: async (req, res) => { res.send('mis char') }
};