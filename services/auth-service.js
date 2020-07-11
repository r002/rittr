// ./services/auth-service.js
// Responsible for generating OTP and emailing the OTP to the user.
// ========

const crypto = require('crypto')
const db = require('../services/db')
const emailerService = require('../services/emailer-service')
const userService = require('../services/user-service')

const OTP_EXPIRY = process.env.OTP_EXPIRY
const ROOT_URL = process.env.ROOT_URL

// https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js/25690754#25690754
generate_otp = () => {
    return crypto.randomBytes(48).toString('base64').replace(/\+/g, '-')
                 .replace(/\//g, '_').replace(/\=/g, '')
}

insert_otp_into_db = async (user, otp) => {
    let rs = await db.query('INSERT INTO one_time_passwords (user_id, otp, expiry) '+
                            `VALUES ($1, $2, now() + INTERVAL '${OTP_EXPIRY}') RETURNING *`,
                            [user.id, otp])
    return rs.status
}

email_otp = async (user) => {
    let otp = generate_otp()
    if (await insert_otp_into_db(user, otp))
    {
        let subject = "Rittr | Use this OTP to login ​🔐​👑​💍​"
        let body = `Use this OTP to login ​🔑​🔐​❤️️​:<br />\n`
                    + `<a href="${ROOT_URL}/?id=${user.id}&otp=${otp}">Click me to login!</a>\n`
                    + `<br /><br />\n`
                    + `${ROOT_URL}/?id=${user.id}&otp=${otp}\n`
        rs = await emailerService.send_email(user, subject, body)
        return rs
    }
    return {
        status: 0,
        errMsg: "Error inserting otp for user into db."
    }
}

module.exports = {
    generate_otp,
    email_otp,
    email_otp_api : async (req, res) => {
        // console.log("~~~~~~~req.body", req.body)
        let user = await userService.get_user_by_email(req.body.email)
        let rs = {
            status: -1,
            email: req.body.email
        }
        if (1==user.status) {
            let email_rs = await email_otp(user)  // TODO: If emailer service fails, handle later
                                                  //       as a separate status code.
            rs.status = 1
        } else {
            rs.status = 0
        }

        // TODO: In the future, implement proper REST error codes. 7/11/20
        // https://blog.restcase.com/rest-api-error-codes-101/
        res.set('Content-Type', 'application/json; charset=UTF-8')
        res.send(JSON.stringify(rs))
        // console.log("~~~~~~~sent res: ", res)
    },
}
