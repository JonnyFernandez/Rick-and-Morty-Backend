const axios = require('axios')
const Char = require('../models/char.model')
const { ObjectId } = require('mongodb');

module.exports = {
    getChar: async (name, userId) => {
        console.log(userId);
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
    postChar: async (name, status, species, gender, origin, image, user) => {
        const charFound = await Char.findOne({ name })
        if (charFound) throw new Error('the character already exist')
        const newChar = new Char({ name, status, species, gender, origin, image, user })
        const saveChar = await newChar.save()
        return saveChar;
    },
    update_character: async (id, data, userId) => {
        if (isNaN(id)) {
            const auxFound = await Char.findById(id);
            if (!auxFound) throw new Error('character not exist')
            const userObjectId = new ObjectId(userId);
            const idString = auxFound.user;

            if (userObjectId.equals(idString)) {
                const char = await Char.findByIdAndUpdate(id, data, { new: true });
                if (!char) {
                    throw new Error('Character not found');
                }
                return char;
            } else {
                throw new Error('You did not create this character, so you cannot update it.');
            }
        } else {
            throw new Error('You cannot update characters that you did not create.');
        }
    },
    remove: async (id, userId) => {
        if (isNaN(id)) {
            const auxFound = await Char.findById(id);
            if (!auxFound) throw new Error('character not exist')
            const userObjectId = new ObjectId(userId);
            const idString = auxFound.user;

            if (userObjectId.equals(idString)) {
                const char = await Char.findByIdAndDelete(id);
                if (!char) {
                    throw new Error('Character not found');
                }
                return `${char.name} removed`;
            } else {
                throw new Error('You did not create this character, so you cannot remove it.');
            }
        } else {
            throw new Error('You cannot delete characters that you did not create.');
        }
    },




    paginate: async (page) => {
        if (page > 42) throw new Error('There are only 42 pages.')
        const char = await axios(`https://rickandmortyapi.com/api/character/?page=${page}`)
        if (char.data.results.length > 0) {
            return char.data.results.map(item => {
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
        return "You have no connection with rick and morty api"
    },
    db: () => {
        return [{}, {}]
    },
}

