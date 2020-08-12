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
    let client_id = 123

    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/user/${user_id}/heartbeat/${client_id}?otp=${otp}`)
    let rs = await res.json()
    t.equal(rs.status, 1, `REST '/v1/user/:uid/heartbeat/:client_id' rs: ${JSON.stringify(rs)}`)
    // t.equal(rs.edictstream.length, 5, `Api call return: ${JSON.stringify(rs)}`)
    t.end()
})
