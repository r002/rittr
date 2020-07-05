// test/user-service-test.js
// ========

const t = require('tap')
const dotenv = require('dotenv')
dotenv.config()
const userService = require('../services/user-service')
const db = require('../services/db')
const User = require('../models/user')


t.test('1.1: Successfully create a user', async (t) => {
    // Mock what an acceptable user object input looks like
    let mockUser = new User("aaa", "aaa@email.com", "aaa Land")
    let rs = await userService.create_user(mockUser)
    // console.log("Test 1.1 Return: ", rs)
    const user = rs.payload[0]
    t.equal(rs.status, 1, `New user created: ${JSON.stringify(user)}`)
    t.equal(user.name, mockUser.name, `New user's name: ${mockUser.name}`)

    // Clean-up. Delete this mock user user we just created.
    // Investigate how to get 'result code' back from psql deletion?
    if (1==rs.status) {
        cleanup = await userService.delete_user(user.id)
        t.pass(`User deleted from db - User id: ${user.id}`)
        // console.log("1.1 Cleanup succeeded. Deleted: ", rs)
    }
    t.end()
});

t.test('1.2: Fail to create a user-- duplicate email', async (t) => {
    // Mock what an acceptable user object input looks like
    let mockUser = new User("Mr. Duplicate", "duplicate@email.com", "Duplicate Land")
    let rs = await userService.create_user(mockUser)
    // console.log("Test 1.2 Return: ", user)
    t.equal(rs.status, 0, `rs.status==0 - create_user(..) failed: ${mockUser.email}`)
    t.equal(rs.errMsg, 'ERR-001: Non-unique email address.',
            `Error message returned: '${rs.errMsg}'`)
    t.end()
});

// // Successful Deletion of User.
// // Weird... doesn't fail when the user id doesn't exist. Investigate later.
// t.test('1.3: Successfully delete a user', async (t) => {
//     // Mock what an acceptable user object input looks like
//     target_user_id = 11
//     rs = await userService.delete_user(target_user_id)
//     console.log("Test 1.3 Return: ", rs)
//     t.equal(rs.status, 1)
//     // t.equal(rs.payload[0].name, mockUser.name)
//     t.end()
// });

t.test('Close the db connection pool.', async (t) => {
    t.pass("All tests finished. Closing db connection pool.")
    db.end()
});
