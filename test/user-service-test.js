// test/user-service-test.js
// ========

const dotenv = require('dotenv')
dotenv.config()
const t = require('tap')
const userService = require('../services/user-service')
const db = require('../services/db')
const util = require('../lib/util')
const User = require('../models/user')


console.log("############# Beginning Tests! ###################")
t.test('000: Initialization', async (t) => {
    let rs = await util.reset_db()
    t.equal(rs.status, 1, `Db sucessfully reset: ${JSON.stringify(rs)}`)
    t.end()
})

t.test('User.001: Successfully create user.', async (t) => {
    // Mock what an acceptable user object input looks like
    let mockUser = new User("The Grinch", "grinch@whoville.com", "Whoville")
    let rs = await userService.create_user(mockUser)
    t.equal(rs.status, 1, `Returned: ${JSON.stringify(rs)}`)

    const user = rs.payload[0]
    t.equal(user.name, mockUser.name, `New user created: ${JSON.stringify(user)}`)
    t.end()
});

t.test('User.002: Fail to create user-- Duplicate email address.', async (t) => {
    // Mock what an unacceptable user object input looks like
    let mockUser = new User("Mr. Duplicate", "duplicate@example.com", "Duplicate Land")
    let rs = await userService.create_user(mockUser)
    // console.log("Test 1.2 Return: ", user)
    t.equal(rs.status, 0, `rs.status==0 - create_user(..) failed: ` +
            `${JSON.stringify(mockUser)}`)
    t.equal(rs.errMsg, 'ERR-002: Non-unique email address.',
            `Error message returned: '${rs.errMsg}'`)
    t.end()
});

t.test('User.003: Fail to create user-- Invalid field.', async (t) => {
    // Mock what an 'no-name' user object input looks like
    let mockUser = new User(" ", "no-name@email.com", "No-Name Land")
    let rs = await userService.create_user(mockUser)
    t.equal(rs.status, 0, `create_user(..) failed - Invalid 'user.name': ` +
            `${JSON.stringify(mockUser)}`)
    t.equal(rs.errMsg, `ERR-003: Invalid 'user.name' or 'user.email' field.`,
            `ErrMsg returned: '${rs.errMsg}'`)

    // Mock what an 'empty-email' user object input looks like
    mockUser = new User("No Email", " ", "No-Email Land")
    rs = await userService.create_user(mockUser)
    t.equal(rs.status, 0, `create_user(..) failed - Invalid 'user.email': ` +
            `${JSON.stringify(mockUser)}`)
    t.equal(rs.errMsg, `ERR-003: Invalid 'user.name' or 'user.email' field.`,
            `ErrMsg returned: '${rs.errMsg}'`)

    // Mock what an 'invalid-email' user object input looks like
    mockUser = new User("Bad Email", "bogus_email_address", "Bad-Email Land")
    rs = await userService.create_user(mockUser)
    t.equal(rs.status, 0, `create_user(..) failed - Invalid 'user.email': ` +
            `${JSON.stringify(mockUser)}`)
    t.equal(rs.errMsg, `ERR-003: Invalid 'user.name' or 'user.email' field.`,
            `ErrMsg returned: '${rs.errMsg}'`)

    t.end()
});

t.test('User.004: Successfully get a user by id', async (t) => {
    let user = await userService.get_user_by_id(1)
    t.equal(user.status, 1, `User status: ${user.status}`)
    t.equal(user.name, "Robert", `'${user.name}' matches expected for user id: '${user.id}'.`)
    t.end()
});

t.test('User.005: Successfully get a user by email', async (t) => {
    let user = await userService.get_user_by_email('robert@ilope.org')
    t.equal(user.status, 1, `User status: ${user.status}`)
    t.equal(user.name, "Robert", `'${user.name}' matches expected for user email: '${user.email}'.`)
    t.end()
});

t.test('User.006: Fail to get a user by id', async (t) => {
    let bogus_id = 0
    let user = await userService.get_user_by_id(bogus_id)
    t.equal(user.status, 0, `No user exists with id: ${bogus_id}.`)
    t.end()
});

t.test('User.007: Fail to get a user by email', async (t) => {
    let bogus_email = 'doesnt_exist@example.com'
    let user = await userService.get_user_by_email(bogus_email)
    t.equal(user.status, 0, `No user exists with email: '${bogus_email}'.`)
    t.end()
});

// // Successful Deletion of User.
// // Weird... doesn't fail when the user id doesn't exist. Investigate later.
// t.test('1.4: Successfully delete a user', async (t) => {
//     // Mock what an acceptable user object input looks like
//     target_user_id = 11
//     rs = await userService.delete_user(target_user_id)
//     console.log("Test 1.3 Return: ", rs)
//     t.equal(rs.status, 1)
//     // t.equal(rs.payload[0].name, mockUser.name)
//     t.end()
// });

// t.afterEach((done, t) => {
//   console.log("$$ Test finished!")
//   done()
// })

t.teardown( _ => {
    console.log("~~ User-Service-Test Suite finished. Reset db & close connection pool.")
    util.reset_db()
    db.end()
})
