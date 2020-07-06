// test/emailer-service.js
// ========

var nodemailer = require('nodemailer');

const sa_email = process.env.SA_EMAIL
const sa_pass = process.env.SA_PASS
const from_email = process.env.FROM_EMAIL
const to_email_default = process.env.TO_EMAIL

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(`smtps://${sa_email}:${sa_pass}@smtp.gmail.com`);

// setup e-mail data with unicode symbols
var mailOptions = {
    from: `"Rittr Nodemailer Test" <${from_email}>`, // sender address
    to: `"Test User" <${to_email_default}>`,         // list of receivers
    subject: "placeholder",                          // Subject line
    text: `Test plain text body later.`,             // plaintext body - Test later 7/6/20
    html: "placeholder"                              // html body
};

send_email = (user, subject, body) => {
    mailOptions.to = `"${user.name}" <${user.email}>`
    mailOptions.subject = `${subject}`
    mailOptions.html = `${body}
                        <br /><br />---<br />
                        <em>This email was auto-generated on: ${Date()}</em>`
    // console.log("??? mailOptions", mailOptions)
    // console.log("??? transporter", transporter)

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log("Error happened!!!!", error);
        }
        console.log("nodemailer info obj:", info)
        console.log('Message sent: ' + info.response, mailOptions.subject, mailOptions.html);
    });
}

module.exports = {
    send_email,
    email_temp : (req, res) => {
        let subject = req.query.subject
        let body = req.query.body
        send_email(subject, body)
        res.send(`Email sent! ${subject} | ${body}`)
    },
}
