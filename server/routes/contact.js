const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.get('/', (req, res) => {
    res.send('<h2>connect form goes here</h2>'); 
});

router.post('/', async (req, res) =>{
    console.log('✅received a POST to /contact');
    const{name, email, message} = req.body;
    console.log('contact submission:',{ name, email, message });
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,


            },
            this: {
                rejectUnauthorized: false,
            },
        });
        await transporter.sendMail({
            from: `"portfolio contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `New message from ${name}`,
            html: `
                <h3>New contact Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
             `,   
        
        });
        console.log(`✅ Email sent successfully!`);
        res.redirect('/thankyou.html');

    } catch (err) {
        console.error('Email error:', err);
        res.status(500).send('<h2>sorry, something went wrong. please try again later.</h2>');

    }
});

module.exports = router;