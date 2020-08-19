/*
./test/monitor-service-test.js
========
*/

const t = require('tap')
const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config()
const Monitor = require('../models/monitor')

const ROOT_URL = process.env.ROOT_URL

// t.test('Test monitor.', async (t) => {
//
//     // // Mock a dummy client to simulate interaction with.
//     // client1 = {
//     //     id: 123,
//     //     user_id: 1,
//     //     otp_id: 1,
//     //     res: {},
//     //     ts: null
//     // }
//     //
//     // client2 = {
//     //     id: 456,
//     //     user_id: 6,
//     //     otp_id: 6,
//     //     res: {},
//     //     ts: null
//     // }
//
//     m = Monitor.get_instance()
//     m.print_connected_clients()
//
//
//     // m.add_client(client1)
//     // m.add_client(client2)
//     //
//     // m.broadcast(null)
//
//     t.equal(1, 1, `monitor test`)
//     t.end()
// })
