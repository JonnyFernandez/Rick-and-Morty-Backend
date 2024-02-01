const nodemailer = require('nodemailer')
require('dotenv').config()
const { USER_Gmail, PASS_Gmail } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {

        user: USER_Gmail,
        pass: PASS_Gmail,
    },
});

transporter.verify().then(() => {
    console.log("ready for send emails");
})


module.exports = transporter