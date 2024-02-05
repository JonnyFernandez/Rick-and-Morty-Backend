const axios = require('axios')
const Char = require('../models/char.model')
const Fav = require('../models/fav.model')
const { ObjectId } = require('mongodb');

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
    getChar_by_id: async (id, userId) => {
        if (isNaN(id)) {

            const auxFound = await Char.findById(id);
            if (!auxFound) throw new Error('character not exist')
            const userObjectId = new ObjectId(userId);
            const idString = auxFound.user;

            if (userObjectId.equals(idString)) {
                const res = await Char.findById(id).populate('user')
                if (!res) throw new Error('Character not found');
                return {
                    id: res._id,
                    name: res.name,
                    status: res.status,
                    species: res.species,
                    gender: res.gender,
                    origin: res.origin,
                    image: res.image,
                    user: res.user._id
                };
            } else {
                throw new Error('You do not have access to this character.');
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
        // console.log(data);
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
                return "Character updated";
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
    db: async (userId) => {
        const res = await Char.find({ user: userId }).populate('user')
        if (res.length < 1) return "Empty DB"
        return res.map(item => {
            return {
                id: item._id,
                name: item.name,
                status: item.status,
                species: item.species,
                gender: item.gender,
                origin: item.origin,
                image: item.image,
                user: item.user._id
            }
        })
    },
    random: async (userId) => {
        const arr = []
        for (let i = 1; i < 6; i++) {
            const info = await axios(`https://rickandmortyapi.com/api/character/?page=${i}`)
            arr.push(info.data.results);
        }
        const charDB = await Char.find({ user: userId }).populate('user')
        let aux = arr.concat(charDB).flat(5)

        const getRandomNumber = () => Math.random() - 0.5;
        const randomSortedArray = aux.sort(getRandomNumber);
        const randomFiveArray = randomSortedArray.slice(0, 5);

        return randomFiveArray.map(item => {
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
    },
    fav: async (idChar, name, status, species, gender, origin, image, user) => {
        const favFound = await Fav.findOne({ idChar });
        if (favFound) return "chacarter is in fav"

        const newFav = new Fav({ idChar, name, status, species, gender, origin, image, user })
        const saveFav = await newFav.save()
        return saveFav;
    },
    getFav: async (userId) => {
        const myFav = await Fav.find({ user: userId }).populate('user')
        return myFav.map(item => {
            return {
                id: item._id,
                idChar: item.idChar,
                name: item.name,
                status: item.status,
                species: item.species,
                gender: item.gender,
                origin: item.origin,
                image: item.image
            }
        })
    },
    deleteFav: async (id, userId) => {
        if (isNaN(id)) {
            const fav = await Fav.findById(id);
            if (!fav) throw new Error('character not exist')
            const userObjectId = new ObjectId(userId);
            const idString = fav.user;

            if (userObjectId.equals(idString)) {
                const fav = await Fav.findByIdAndDelete(id);
                if (!fav) {
                    throw new Error('Character not found');
                }
                return `${fav.name} removed`;
            } else {
                throw new Error('You did not create this favorite, so you cannot remove it.');
            }
        } else {
            throw new Error('You cannot delete favorite that you did not create.');
        }
    }
};




