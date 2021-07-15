require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer');
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})
app.post('/send', (req, res) => {
    var transporter = nodemailer.createTransport({
        host: process.env.SERVER,
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
            user: process.env.LOGIN,
            pass: process.env.PASS
        }
    });

    var mailOptions = {
        from: process.env.LOGIN,
        to: 'georg@super-code.de',
        subject: 'Sending Email using Node.js',
        html: `<h2>${req.body.name} send you and Mail.</h2>
        <p> His message is: <br>${req.body.message}</p>
        <p> <a href="mailto:${req.body.email}">To answer use </a><p/>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.end()
        } else {
            console.log('Email sent: ' + info.response);
            res.render('thanks', { name: req.body.name })

        }
    });



})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))