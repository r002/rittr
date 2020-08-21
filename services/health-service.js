/*
./services/health-service.js
Responsible for maintaining a heartbeat from the client to the server.
========
*/

const Monitor = require('../models/monitor')

f_ts = (ts) => {
    let d = (new Date(ts)).toString()  // => 'Tue Aug 18 2020 03:17:16 GMT-0400 (Eastern Daylight Time)'
    return d.split(' (')[0]            // => 'Tue Aug 18 2020 03:17:16 GMT-0400'
}

module.exports = {

    heartbeat_api : (req, res) => {
        client = {
            id: Number(req.params.client_id),
            user_id: Number(req.params.uid),
            otp_id: Number(req.body.otp_id),
            mode: req.query.mode || "normal",
            res: res,
            ts: null,
            dt() {
                return f_ts(this.ts)
            },
            to_key() {
                return `${this.id}_${this.user_id}_${this.mode}`
            },
            to_s() {
                return `${this.id}_${this.user_id}_${this.mode}_${f_ts(this.ts)}`
            }
        }
        m = Monitor.get_instance()
        let rs = m.heartbeat(client)
        res.json(rs)
    },

    clientmap_refresh : (req, res) => {
        console.log("*****clientmap_refresh received!")
        // let req_obj = JSON.parse(req.body)
        // let flash_broadcast = req.body.flash_broadcast

        m = Monitor.get_instance()
        m.refresh_clientmap()

        let rs = { "status": 1 }
        res.json(rs)
    },

    broadcast_flash : (req, res) => {
        // let req_obj = JSON.parse(req.body)
        let flash_broadcast = req.body.flash_broadcast

        m = Monitor.get_instance()
        m.broadcast_flash(flash_broadcast)

        let rs = { "status": 1 }
        res.json(rs)
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
            mode: req.query.mode || "normal",  // Default to 'normal' mode if unspecified.
            res: res,
            ts: null,
            status: null,
            dt() {
                return f_ts(this.ts)
            },
            to_key() {
                return `${this.id}_${this.user_id}_${this.mode}`
            },
            to_s() {
                return `${this.id}_${this.user_id}_${this.mode}_${f_ts(this.ts)}`
            },
            to_obj() {
                return {
                    id: this.id,
                    user_id: this.user_id,
                    mode: this.mode,
                    dt: this.dt(),
                    status: this.status
                }
            }
        }

        m = Monitor.get_instance()
        m.add_client(client)
    }
}
