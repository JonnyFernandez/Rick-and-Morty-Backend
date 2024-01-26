const axios = require('axios')



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
                image: item.image
            }
        });
    },
    db: () => {

    },
    api_pages: async (page) => {
        //paginado cada 20 pages
        const char = await axios(`https://rickandmortyapi.com/api/character/?page=${page}`)
        console.log(char.data);
    },
    all_character: () => {
        return "toods los char"
    },
    character_by_name: async (name) => {
        const char = await axios(`https://rickandmortyapi.com/api/character/?name=${name}`)
    },
    charFrom_DB: (id) => {
        return `busco un char con id: ${id} en la DB`
    },
    charFrom_API: (id) => {
        return `busco un char con id: ${id} en la API`

    },
    postChar: (name, status, species, gender, origin, image) => {
        return `creamos char${job}, y le cambia el nombre a ${name}, ${hobbies}`
    },
    Detele_character: (id) => {
        return `Buscar en char con id: ${id}, y lo elimina`
    },
    update_character: (id, name) => {
        return `buscaria un char id ${id}, y le cambia el nombre a ${name}`
    },


}

