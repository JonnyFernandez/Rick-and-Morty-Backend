const axios = require('axios')
const Char = require('../models/char.model')


module.exports = {
    api: async () => {
        const arr = []
        for (let i = 1; i < 6; i++) {
            const info = await axios(`https://rickandmortyapi.com/api/character/?page=${i}`)
            arr.push(info.data.results);
        }
        return arr.flat(4).map(item => {
            return {
                id: item.id,
                name: item.name,
                status: item.status,
                species: item.species,
                gender: item.gender,
                origin: item.origin.name,
                image: item.image,
                user: null
            }
        });
    },
    db: () => {
        return [{}, {}]
    },
    api_pages: async (page) => {
        //paginado cada 20 pages
        const char = await axios(`https://rickandmortyapi.com/api/character/?page=${page}`)
        console.log(char.data);
    },
    all_character: async () => {
        const apiInfo = await this.api()
        const dbInfo = this.db

        return apiInfo
    },
    character_by_name: async (name) => {
        const char = await axios(`https://rickandmortyapi.com/api/character/?name=${name}`)
        return "hola"
    },
    charFrom_DB: (id) => {
        return `busco un char con id: ${id} en la DB`
    },
    charFrom_API: (id) => {
        return `busco un char con id: ${id} en la API`

    },
    postChar: async (name, status, species, gender, origin, image, user) => {
        const charFound = await Char.findOne({ name })
        if (charFound) throw new Error('the character already exist')
        const newChar = new Char({ name, status, species, gender, origin, image, user })
        const saveChar = await newChar.save()
        return saveChar;
    },
    Detele_character: (id) => {
        return `Buscar en char con id: ${id}, y lo elimina`
    },
    update_character: (id, name) => {
        return `buscaria un char id ${id}, y le cambia el nombre a ${name}`
    },


}

