// ./services/auth-service.js
// Responsible for generating OTP and emailing the OTP to the user.
// ========

const crypto = require('crypto')
const db = require('../services/db')
const emailerService = require('../services/emailer-service')

const OTP_EXPIRY = process.env.OTP_EXPIRY

// https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js/25690754#25690754
generate_otp = () => {
    return crypto.randomBytes(48).toString('base64').replace(/\+/g, '-')
                 .replace(/\//g, '_').replace(/\=/g, '')
}

insert_otp_into_db = async (user, otp) => {
    let rs = await db.query('INSERT INTO one_time_passwords (user_id, otp, expiry) '+
                            `VALUES ($1, $2, now()+INTERVAL '${OTP_EXPIRY}') RETURNING *`,
                            [user.id, otp])
    return rs.status
}

module.exports = {
    generate_otp,
    email_otp : async (user) => {
        let otp = generate_otp()
        if (await insert_otp_into_db(user, otp))
        {
            let subject = "Rittr | Use this OTP to login ​🔐​👑​💍​"
            let body = `Use this OTP to login ​🔑​🔐​❤️️​: ${otp}`
            emailerService.send_email(user, subject, body)
        }
        return otp
    }
}
