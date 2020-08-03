// test/int/user-api-test.js
// ========

const dotenv = require('dotenv')
dotenv.config()
const t = require('tap')
const fetch = require('node-fetch')
const userService = require('../../services/user-service')
const db = require('../../services/db')
const util = require('../../lib/util')
const User = require('../../models/user')
const c = require('../../models/constants')

const ROOT_URL = process.env.ROOT_URL

console.log("############# Beginning Tests! ###################")
t.test('000: Initialization', async (t) => {
    let rs = await util.reset_db()
    t.equal(rs.status, 1, `Db sucessfully reset: ${JSON.stringify(rs)}`)
    t.end()
})

t.test('User.API.001: Successful REST GET all users', async (t) => {
    let user_id = 1  // Set mock user id.  This user doesn't have a valid OTP and should fail.
    let otp = "mock_otp_for_tests_good_until_2021"  // Set mock otp

    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/users?uid=${user_id}&otp=${otp}`)
    let rs = await res.json()
    t.equal(rs.status, 1, `REST '/v1/users' api call status: ${rs.status}`)
    t.equal(rs.users.length, 5, `No of test users: ${rs.users.length}`)
    t.end()
})

t.test('User.API.002: Failed REST GET all users - Invalid auth', async (t) => {
    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/users`)
    let rs = await res.json()
    t.equal(res.status, 401, `http header return status: ${res.status}`)
    t.equal(rs.status, 0, `REST '/v1/users' api call status: ${rs.status}`)
    t.equal(rs.errMsg, c.ERR_E02_INVAL_AUTH,
            `Error message returned: '${rs.errMsg}'`)
    t.end()
})

t.test('User.API.003: Successful REST API POST that creates a valid user.', async (t) => {
    // Create a valid mock user to submit for creation
    let req = {
        name: "Dave",
        email: "rcl2106@gmail.com",
        sovereignty: "Dave Nation"
    }
    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/user`, {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
    let rs = await res.json()
    t.equal(rs.status, 1, `REST '/v1/user' api call return: ${JSON.stringify(rs)}`)
    t.end()
})

t.test('User.API.004: Failed REST API POST - Duplicate User Email.', async (t) => {
    // Create a valid mock user to submit for creation
    let req = {
        name: "Robert",
        email: "robert@ilope.org",
        sovereignty: "Robertland"
    }
    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/user`, {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
    let rs = await res.json()
    t.equal(rs.status, 0, `REST '/v1/user' api call return: ${JSON.stringify(rs)}`)
    t.equal(rs.errMsg, c.ERR_U02_NON_UNIQUE_EMAIL,
            `Error message returned: '${rs.errMsg}'`)
    t.end()
})

t.test('User.API.005: Failed REST API POST - Invalid User Field.', async (t) => {
    // Create an invalid mock user to submit for creation
    // Missing 'name'
    let req = {
        name: " ",
        email: "no-name@email.com",
        sovereignty: "No-Name Land"
    }
    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/user`, {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
    let rs = await res.json()
    t.equal(rs.status, 0, `REST '/v1/user' api call return: ${JSON.stringify(rs)}`)
    t.equal(rs.errMsg, c.ERR_U03_INVAL_USER_FIELD,
            `Error message returned: '${rs.errMsg}'`)
    t.end()
})

t.test('User.API.006: REST API GET-- Get all alphas for a user.', async (t) => {
    let user_id = 1
    let otp = "mock_otp_for_tests_good_until_2021"  // Set mock otp

    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/user/${user_id}/alphas?otp=${otp}`)
    let rs = await res.json()
    t.equal(rs.status, 1, `REST '/v1/user/:uid/alphas' api GET status: ${rs.status}`)
    t.equal(rs.alphas.length, 4, `No of test alphas for uid=1: ${rs.alphas.length}`)
    t.end()
})

t.test('User.API.007: REST API GET-- Get all others for a user.', async (t) => {
    let user_id = 1
    let otp = "mock_otp_for_tests_good_until_2021"  // Set mock otp

    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/user/${user_id}/others?otp=${otp}`)
    let rs = await res.json()
    t.equal(rs.status, 1, `REST '/v1/user/:uid/others' api GET status: ${rs.status}`)
    t.equal(rs.others.length, 1, `No of test others for uid=1: ${rs.others.length}`)
    t.end()
})

t.test('User.API.008: Successful REST API POST that creates an alpha for a user.', async (t) => {
    let user_id = 1
    let otp = "mock_otp_for_tests_good_until_2021"  // Set mock otp
    let alpha_id = 4

    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/user/${user_id}/alpha/${alpha_id}?otp=${otp}`, {
            method: 'POST'
        })
    let rs = await res.json()
    t.equal(rs.status, 1, `REST '/v1/user/:uid/alpha/:aid' api call return: ${JSON.stringify(rs)}`)
    t.end()
})

t.test('User.API.009: Do-Nothing REST API POST-- User tries to create an existing alpha.', async (t) => {
    let user_id = 1
    let otp = "mock_otp_for_tests_good_until_2021"  // Set mock otp
    let alpha_id = 4

    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/user/${user_id}/alpha/${alpha_id}?otp=${otp}`, {
            method: 'POST'
        })
    let rs = await res.json()
    t.equal(rs.status, 1, `REST '/v1/user/:uid/alpha/:aid' api call return: ${JSON.stringify(rs)}`)
    t.end()
})

t.test('User.API.010: REST API DELETE-- User deletes an alpha.', async (t) => {
    let user_id = 1
    let alpha_id = 4
    let otp = "mock_otp_for_tests_good_until_2021"  // Set mock otp
    // Call JSON REST API.
    let res = await fetch(`${ROOT_URL}/v1/user/${user_id}/alpha/${alpha_id}?otp=${otp}`, {
            method: 'DELETE'
        })
    let rs = await res.json()
    t.equal(rs.status, 1, `REST '/v1/user/:uid/alpha/:aid' DELETE call return: ${JSON.stringify(rs)}`)
    t.end()
})

t.teardown( _ => {
    console.log("~~ User-API-Test Suite finished. Reset db & close connection pool.")
    util.reset_db()
    db.end()
})
