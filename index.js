const server = require('./src/app')
const connectDB = require('./src/db')
require('dotenv').config()
const { PORT } = process.env

connectDB()

server.listen(PORT, () => console.log(`server on port ${PORT}`))