const charFrom_DB = (id) => {
    return `busco un char con id: ${id} en la DB`
}

const charFrom_API = (id) => {
    return `busco un char con id: ${id} en la API`

}



module.exports = { charFrom_API, charFrom_DB }