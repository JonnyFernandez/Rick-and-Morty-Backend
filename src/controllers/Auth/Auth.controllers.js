const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { TOKEN_SECRET } = process.env

module.exports = {
    register: async (username, email, password) => {
        const userFound = await User.findOne({ email })
        if (userFound) throw new Error("the email already exist")
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({ email, password: passwordHash, username })
        const savedUser = await newUser.save()
        return {
            id: savedUser._id,
            email: savedUser.email,
            username: savedUser.username,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        }
    },
    login: async (email, password) => {

        const userFound = await User.findOne({ email })
        if (!userFound) throw new Error('User not found')
        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) throw new Error('Password incorrect')

        return {
            id: userFound._id,
            email: userFound.email,
            username: userFound.username,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        }

    },
    profile: async (id) => {
        const userFound = await User.findById(id);
        if (!userFound) throw new Error('user not found')

        return {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        }
    },
    verifyToken: async (token) => {



        jwt.verify(token, TOKEN_SECRET, async (err, user) => {
            if (err) throw new Error("Unauthorized/token expired")

            const userFound = await User.findById(user.id)
            if (!userFound) throw new Error("Unauthorized/user not found")



        });
        let aux = {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        }
        return aux
    }







}