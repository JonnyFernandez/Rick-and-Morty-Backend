const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/RyM')
        console.log(">>> DB 'R & M' connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB