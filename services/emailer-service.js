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
    mailOptions.html = `${body}\n`
                        + `<br /><br />---<br />\n`
                        + `<em>This email was auto-generated on: ${Date()}</em>\n`
    // console.log("??? mailOptions", mailOptions)
    // console.log("??? transporter", transporter)

    // send mail with defined transport object
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            let rs = { status: 0 }
            if(error){
                // console.log("Error happened!", error)
                rs.errMsg = error
            } else {
                // console.log("nodemailer info obj:", info)
                // console.log('Message sent: ' + info.response, mailOptions.subject, mailOptions.html)
                rs.status = 1
            }
            resolve(rs)
        })
    })
}

module.exports = {
    send_email
}
