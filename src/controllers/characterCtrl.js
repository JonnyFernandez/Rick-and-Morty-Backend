const axios = require('axios')
const Char = require('../models/char.model')


module.exports = {
    getChar: async (name, userId) => {
        if (name) {
            const searchName = name;
            const regex = new RegExp(searchName, 'i');
            const result = await Char.find({ name: regex });

            if (result.length > 0) return result
            else {
                const char = await axios(`https://rickandmortyapi.com/api/character/?name=${name}`)
                if (char.data.results && char.data.results.length > 0) return char.data.results.map(item => {
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
                })

            }
        } else {
            const arr = []
            for (let i = 1; i < 6; i++) {
                const info = await axios(`https://rickandmortyapi.com/api/character/?page=${i}`)
                arr.push(info.data.results);
            }
            const charDB = await Char.find({ user: userId }).populate('user')

            return arr.concat(charDB).flat(5).map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    status: item.status,
                    species: item.species,
                    gender: item.gender,
                    origin: item.origin.name,
                    image: item.image,
                    user: item.user ? item.user._id : null
                }
            });
        }
    },
    getChar_by_id: async (id) => {
        if (isNaN(id)) {
            const res = await Char.findById(id).populate('user')
            return {
                id: res._id,
                name: res.name,
                status: res.status,
                species: res.species,
                gender: res.gender,
                origin: res.origin,
                image: res.image,
                user: res.user._id
            }
        } else {
            const aux = await axios(`https://rickandmortyapi.com/api/character/${id}`)
            if (!aux) throw new Error('id not found')
            return {
                id: aux.data.id,
                name: aux.data.name,
                status: aux.data.status,
                species: aux.data.species,
                gender: aux.data.gender,
                origin: aux.data.origin.name,
                image: aux.data.image,
                user: null
            }


        }


    },
    db: () => {
        return [{}, {}]
    },
    api_pages: async (page) => {
        //paginado cada 20 pages
        const char = await axios(`https://rickandmortyapi.com/api/character/?page=${page}`)
        console.log(char.data);
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

