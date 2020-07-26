// ./test/edict-service-test.js
// ========

const t = require('tap')
const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config()
const db = require('../services/db')
const util = require('../lib/util')
const c = require('../models/constants')
const Edict = require('../models/edict')

const ROOT_URL = process.env.ROOT_URL

console.log("############# Beginning Tests! ###################")
t.test('000: Initialization', async (t) => {
    let rs = await util.reset_db()
    t.equal(rs.status, 1, `Db sucessfully reset: ${JSON.stringify(rs)}`)
    t.end()
})

t.test('Edict.001: Successful REST API GET all edicts for a user.', async (t) => {

    let user_id = 1  // Set mock user id.  This user doesn't have a valid OTP and should fail.
    let otp = "mock_otp_for_tests_good_until_2021"  // Set mock otp

    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/user/${user_id}/edicts?otp=${otp}`)
    let rs = await res.json()
    t.equal(rs.status, 1, `REST '/v1/edict' status: ${JSON.stringify(rs.status)}`)
    t.equal(rs.edicts.length, 2, `REST '/v1/edict' api call return: ${JSON.stringify(rs)}`)
    t.end()
})

t.test('Edict.002: Successful REST API POST to promulgate edict.', async (t) => {

    let user_id = 1  // Set mock user id
    let otp = "mock_otp_for_tests_good_until_2021"  // Set mock otp
    let law = "This is a test edict."

    // Create a request obj containing the edict
    let edict = new Edict(user_id, otp, law)

    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/edict`, {
            method: 'POST',
            body: JSON.stringify(edict),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
    let rs = await res.json()
    t.equal(rs.status, 1, `REST '/v1/edict' api call return: ${JSON.stringify(rs)}`)
    t.end()
})

t.test('Edict.003: Failed REST API POST to promulgate edict.', async (t) => {

    let user_id = 2  // Set mock user id.  This user doesn't have a valid OTP and should fail.
    let otp = "mock_otp_for_tests_good_until_2021"  // Set mock otp
    let law = "This is a test edict."

    // Create a request obj containing the edict
    let edict = new Edict(user_id, otp, law)

    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/edict`, {
            method: 'POST',
            body: JSON.stringify(edict),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
    let rs = await res.json()
    t.equal(rs.status, 0, `REST '/v1/edict' api call return: ${JSON.stringify(rs)}`)
    t.equal(rs.errMsg, c.ERR_E02_INVAL_AUTH,
            `Error message returned: '${rs.errMsg}'`)
    t.end()
})

t.teardown( _ => {
    console.log("~~ Edict-Service-Test Suite finished. Reset db & close connection pool.")
    util.reset_db()
    db.end()
})
