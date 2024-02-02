const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { TOKEN_SECRET } = process.env
const transporter = require('../../utils/mailer')

module.exports = {
    register: async (username, email, password) => {
        const userFound = await User.findOne({ email })

        if (userFound) throw new Error("the email already exist")
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({ email, password: passwordHash, username })
        const savedUser = await newUser.save()
        //-----------------------------------------------------------------------------------

        await transporter.sendMail({
            from: '"Rick & Morty App" <arcancode@gmail.com>',
            to: email,
            subject: "¡Bienvenido a Rick & Morty App! ✔",
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                background-color: #f0f0f0;
                                color: #333;
                            }
                            .container {
                                max-width: 600px;
                                margin: 20px auto;
                                padding: 20px;
                                background-color: #fff;
                                border-radius: 8px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            h1 {
                                color: #4285f4;
                            }
                            p {
                                line-height: 1.6;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>¡Bienvenido a Rick & Morty App!</h1>
                            <p>Hola,</p>
                            <p>Estamos emocionados de tenerte como parte de nuestra comunidad. Explora nuestro universo de personajes y disfruta de todas las funcionalidades que ofrecemos.</p>
                            <p>¡Gracias por unirte!</p>
                            <p>Atentamente,<br>Jonny Fernandez (Full Stack Developer) <br> LinkedIn: ${"https://www.linkedin.com/in/jonathan-fernandez-65a959277/"} <br> Github: ${"https://github.com/JonnyFernandez"} <br> Portfolio: ${"https://portfolio-t79v.vercel.app/"} </p>
                        </div>
                    </body>
                </html>
            `,
        });





        //-----------------------------------------------------------------------------------
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
    verifyToken: async (id) => {

        const userFound = await User.findById(id)
        return {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        }
    }
};