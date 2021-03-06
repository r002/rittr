// test/emailer-service-test.js
// ========

const t = require('tap')
const dotenv = require('dotenv')
dotenv.config()
const emailerService = require('../services/emailer-service')
const userService = require('../services/user-service')
const db = require('../services/db')


// Successful Send Email.
// This test is still currently incomplete.
// If the recipient email is bogus, a "Mail Delivery Subsystem" email
// is sent back to the SA account.  To detect a failure, I need to set up
// an email inbox listener? Investigate more later. 7/5/20
t.test('Emailer.001: Successfully send an email', async (t) => {

    let user = await userService.get_user_by_id(1)
    t.equal(user.name, "Robert", `'${user.name}' matches expected for '${user.id}'.`)

    emailerService.send_email(user, "Subject Test", "Body Test")
    t.pass("Email test finished!")
    t.end()
});


t.test('Close the db connection pool.', async (t) => {
    t.pass("All tests finished. Closing db connection pool.")
    db.end()
});
