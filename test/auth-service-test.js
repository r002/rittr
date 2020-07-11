// test/emailer-service-test.js
// ========

const t = require('tap')
const dotenv = require('dotenv')
dotenv.config()
const authService = require('../services/auth-service')
const userService = require('../services/user-service')
const db = require('../services/db')
const util = require('../lib/util')
const fetch = require('node-fetch')

const ROOT_URL = process.env.ROOT_URL

t.test('Auth.001: Successfully generate otp.', (t) => {
    let otp = authService.generate_otp()
    t.equal(otp.length, 64, `Otp generated: ${otp}`)
    t.end()
});

// TODO: Move this test to /test/int/ later. 7/11/20
t.test('Auth.002: Successfully email otp to user.', async (t) => {
    let user = await userService.get_user_by_id(1)
    t.equal(user.name, "Robert", `'${user.name}' matches expected for '${user.id}'.`)

    let rs = await authService.email_otp(user)
    t.equal(rs.status, 1, `Otp generated and emailed: ${user.email} | ${rs}`)
    t.end()
});

// TODO: Move this test to /test/int/ later. 7/11/20
t.test('Auth.003: Successful REST API call that emails otp to valid user.', async (t) => {
    // Get mock user from test db.
    let user = await userService.get_user_by_id(1)
    t.equal(user.name, "Robert", `'${user.name}' matches expected for user id: '${user.id}'.`)

    // Create a request obj containing the user's email.
    let req = {"email": user.email}

    // Call my JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/otp_token`, {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
    let rs = await res.json()
    t.equal(rs.status, 1, `REST '/v1/otp_token' api call return: ${JSON.stringify(rs)}`)
    t.end()
})

t.test('Auth.004: Successful REST API call for an invalid user.', async (t) => {
    // Get mock user from test db.
    let user = {email: "bogus@example.com"}

    // Create a request obj containing the user's email.
    let req = {"email": user.email}

    // Call my JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/otp_token`, {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
    let rs = await res.json()
    t.equal(rs.status, 0, `REST '/v1/otp_token' api call return: ${JSON.stringify(rs)}`)
    t.end()
})

t.teardown( _ => {
    console.log("~~ Auth-Service-Test Suite finished. Reset db & close connection pool.")
    util.reset_db()
    db.end()
})
