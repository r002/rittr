// test/emailer-service-test.js
// ========

const t = require('tap')
const dotenv = require('dotenv')
dotenv.config()
const authService = require('../services/auth-service')
const userService = require('../services/user-service')
const db = require('../services/db')

t.test('Auth.001: Successfully generate otp', (t) => {

    let otp = authService.generate_otp()
    t.pass(`Otp generated: ${otp}`)
    t.end()
});

// This is technically an integration test.
// Where should this test go?
t.test('Auth.002: Successfully email otp to user', async (t) => {

    let user = await userService.get_user_by_id(1)
    t.equal(user.name, "Robert", `'${user.name}' matches expected for '${user.id}'.`)

    let rs = await authService.email_otp(user)
    t.pass(`Otp generated and emailed: ${user.email} | ${rs}`)
    t.end()
});


t.test('Close the db connection pool.', async (t) => {
    t.pass("All tests finished. Closing db connection pool.")
    db.end()
});
