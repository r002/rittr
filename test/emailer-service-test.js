// test/emailer-service-test.js
// ========

const t = require('tap')
const dotenv = require('dotenv')
dotenv.config()
const emailerService = require('../services/emailer-service')


// Successful Send Email.
// This test is still currently incomplete.
// If the recipient email is bogus, a "Mail Delivery Subsystem" email
// is sent back to the SA account.  To detect a failure, I need to set up
// an email inbox listener? Investigate more later. 7/5/20
t.test('Emailer.001: Successfully send an email', (t) => {

    emailerService.send_email("Subject Test", "Body Test")
    t.pass("Email test finished!")
    t.end()
});
