const mongoose = require('mongoose')

const charSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    status: {
        type: String,
        require: true,
        trim: true,
        enum: ['vivo', 'muerto', 'desconocido'] // Valores permitidos
    },
    species: {
        type: [String],
        require: true,
        trim: true,
        enum: ['Humano', 'Alien', 'Robot'],
    },
    gender: {
        type: String,
        require: true,
        enum: ['Male', 'Famele', 'Unknow'],
    },
    origin: {
        type: String,
        require: false,
        trim: true
    },
    image: {
        type: String,
        require: true,
        trim: true
    }
}, { timestamps: true })


module.exports = mongoose.model('Char', charSchema)