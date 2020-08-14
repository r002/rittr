/*
./services/health-service.js
Responsible for maintaining a heartbeat from the client to the server.
========
*/

const Monitor = require('../models/monitor')

module.exports = {

    // heartbeat_api : (req, res) => {
    //     client = {
    //         id: Number(req.params.client_id),
    //         user_id: Number(req.params.uid),
    //         otp_id: Number(req.body.otp_id),
    //         res: res,
    //         ts: null
    //     }
    //     // m = Monitor.get_instance()
    //     // m.add_client(client)
    //
    //     res.json({
    //         status: 1
    //     })
    // },

    test_broadcast : (req, res) => {
        m = Monitor.get_instance()
        m.print_connected_clients()
        m.broadcast(null)

        res.json({
            status: 1
        })
    },

    // Set up EventSource streaming pipeline
    monitor : (req, res) => {
        // Set the header to prepare the browser for EventSource streaming
        res.set({
           'Cache-Control': 'no-cache',
           'Content-Type': 'text/event-stream',
           'Connection': 'keep-alive'
        })
        res.flushHeaders()

        client = {
            id: Number(req.params.client_id),
            user_id: Number(req.params.uid),
            otp_id: Number(req.body.otp_id),
            res: res,
            ts: null
        }

        m = Monitor.get_instance()
        m.add_client(client)
    }
}
