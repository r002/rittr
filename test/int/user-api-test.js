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

t.test('User.API.001: Successful REST API call that creates a valid user.', async (t) => {
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

t.test('User.API.002: Failed REST API call - Duplicate User Email.', async (t) => {
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
    t.equal(rs.errMsg, c.ERR_002_NON_UNIQUE_EMAIL,
            `Error message returned: '${rs.errMsg}'`)
    t.end()
})

t.test('User.API.003: Failed REST API call - Invalid User Field.', async (t) => {
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
    t.equal(rs.errMsg, c.ERR_003_INVAL_USER_FIELD,
            `Error message returned: '${rs.errMsg}'`)
    t.end()
})

t.teardown( _ => {
    console.log("~~ User-API-Test Suite finished. Reset db & close connection pool.")
    util.reset_db()
    db.end()
})
