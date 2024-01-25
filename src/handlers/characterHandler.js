const { all_character, character_by_name } = require('../controllers/characterCtrl/getCharacter')
const { charFrom_API, charFrom_DB } = require('../controllers/characterCtrl/char_by_id')
const update_character = require('../controllers/characterCtrl/updateChar')
const postChar = require('../controllers/characterCtrl/create')
const Detele_character = require('../controllers/characterCtrl/delete')


const getChar = (req, res) => {
    const { name } = req.query;
    try {
        let char = name ? character_by_name(name) : all_character()
        res.status(200).json(char)
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}
const getCharById = (req, res) => {
    const { id } = req.params;
    try {
        let charID = isNaN(id) ? charFrom_DB(id) : charFrom_API(id)
        res.status(200).json(charID)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const updateChar = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        let charUpdate = update_character(id, name)
        res.status(200).json(charUpdate)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const createChar = (req, res) => {
    const { name, job, hobbies } = req.body;
    try {
        let charCreate = postChar(name, job, hobbies)
        res.status(200).json(charCreate)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
const removeChar = (req, res) => {
    const { id } = req.params;

    try {
        let charDelete = Detele_character(id)
        res.status(200).json(charDelete)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};




module.exports = { getChar, getCharById, updateChar, createChar, removeChar }