var nodemailer = require("nodemailer");
const config = require('config');

const sendEmail = (to, subject, html) => {

    transporter = nodemailer.createTransport(config.get('mailSettings'));  
    
    var mail = {
        from: config.get('appEmail'),
        to: to,
        subject: subject,
        html: html
    }
    
    transporter.sendMail(mail, function(err, info) {
        if (err) console.log(err);
        transporter.close();
    });
}

module.exports = { sendEmail }