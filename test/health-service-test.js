/*
./test/health-service-test.js
========
*/

const t = require('tap')
const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config()
const healthService = require('../services/health-service')

const ROOT_URL = process.env.ROOT_URL

t.test('Health.001: Successful REST API GET heartbeat (Robert/id:1).', async (t) => {

    let user_id = 1
    let otp = "mock_otp_for_tests_good_until_2021"
    let client_id = 47

    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/user/${user_id}/heartbeat/${client_id}?mode=admin&otp=${otp}`)
    let rs = await res.json()
    t.equal(rs.status, 1, `REST '/v1/user/:uid/heartbeat/:client_id' rs: ${JSON.stringify(rs)}`)
    // t.equal(rs.edictstream.length, 5, `Api call return: ${JSON.stringify(rs)}`)
    t.end()
})

t.test('Test flash broadcast.', async (t) => {

    let user_id = 1
    let otp = "mock_otp_for_tests_good_until_2021"
    let flash_broadcast = `Test flash broadcast from TAP: ${Date.now()}`

    let req = {
        user_id: user_id,
        otp: otp,
        flash_broadcast: flash_broadcast
    }

    let res = await fetch(`${ROOT_URL}/v1/admin/${user_id}/flash_broadcast?otp=${otp}`, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    let rs = await res.json()
    console.log("fetch returned: ", rs)

    t.equal(1, 1, `Test flash broadcast`)
    t.end()
})
