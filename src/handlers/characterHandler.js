const { all_character, character_by_name } = require('../controllers/characterCtrl/getCharacter')
const { charFrom_API, charFrom_DB } = require('../controllers/characterCtrl/char_by_id')
const update_character = require('../controllers/characterCtrl/updateChar')
const postChar = require('../controllers/characterCtrl/create')
const Detele_character = require('../controllers/characterCtrl/delete')

const control = require('../controllers/characterCtrl.js')


module.exports = {
    getChar: async (req, res) => {
        const { name } = req.query;

        try {
            const char = await control.api(name, req.user.id)

            res.status(200).json(char)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    getCharById: (req, res) => {
        const { id } = req.params;
        try {
            let charID = isNaN(id) ? charFrom_DB(id) : charFrom_API(id)
            res.status(200).json(charID)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    updateChar: (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            let charUpdate = update_character(id, name)
            res.status(200).json(charUpdate)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    createChar: async (req, res) => {
        const { name, status, species, gender, origin, image } = req.body;
        const user = req.user.id
        try {
            let charCreate = await control.postChar(name, status, species, gender, origin, image, user)
            res.status(200).json(charCreate)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },
    removeChar: (req, res) => {
        const { id } = req.params;
        try {
            let charDelete = Detele_character(id)
            res.status(200).json(charDelete)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

};
