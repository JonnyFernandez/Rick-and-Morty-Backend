const mongoose = require('mongoose')

const favSchema = new mongoose.Schema({
    idChar: {
        type: String,
        require: true,
        trim: true
    },
    name: {
        type: String,
        require: true,
        trim: true
    },
    status: {
        type: String,
        require: true,
        trim: true,
        enum: ['vivo', 'muerto', 'desconocido']
    },
    species: {
        type: String,
        require: true,
        trim: true,
        enum: ['Humano', 'Alien', 'Robot'],
    },

    gender: {
        type: String,
        require: true,
        enum: ['Male', 'Female', 'Unknow'],
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true })


module.exports = mongoose.model('Fav', favSchema)