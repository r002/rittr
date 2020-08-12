/*
./services/health-service.js
Responsible for maintaining a heartbeat from the client to the server.
========
*/

var admins = {}
var clients = {}

heartbeat = (beat) => {
    clients[beat.client_id] = beat.ts = Date.now()  // 1596520118458
    beat.status = 1
    console.log("***** beat", beat)
    return beat
}

module.exports = {
    // clients,
    heartbeat_api : (req, res) => {
        let beat = {
            "status": 0,
            "user_id": Number(req.params.uid),
            "otp_id": Number(req.body.otp_id),
            "client_id": Number(req.params.client_id)
        }
        rs = heartbeat(beat)
        res.json(rs)
    },

    monitor : async (req, res) => {
        // Send the header to prepare the browser for EventSource streaming
        res.set({
           'Cache-Control': 'no-cache',
           'Content-Type': 'text/event-stream',
           'Connection': 'keep-alive'
        })
        res.flushHeaders()

        let count = 0
        let loopFlag = true
        while (loopFlag)
        {
            await new Promise(resolve => setTimeout(resolve, 1000))
            count++

            // Every X seconds, 'ping' every client in the clientMap.
            // If we receive a response, update the client's "last ping" field.
            if( 0==count%10 ) {
                console.log(`Ping every client:`, count)
                res.write(`event: ping\n` +
                          `data: {"msg": "Please ping back: ${count}"}\n\n`)
            }

            // Every Y seconds, scan the clientMap and evict any stale connections.
            if( 0==count%30) {
                console.log("^^^ Scanning to evict stale clients ^^^")
                Object.keys(clients).forEach((clientId) => {
                    let ts = clients[clientId]
                    if (Date.now() - ts > 20000) {
                        delete clients[clientId]
                        console.log("$$$$ Deleted clientId!", clientId)
                        loopFlag = false
                    }
                })
            }

            // Every second, broadcast the entire in-memory clientMap to all endpoints.
            let clientMap = JSON.stringify(clients)
            console.log(`Clients connected:`, clientMap)
            res.write(`event: clients\n` +
                      `data: ${clientMap}\n\n`)

            // await new Promise(resolve => setTimeout(resolve, 1000))
            // let payload = JSON.stringify({
            //     "msg": count++
            // })
            // console.log(`Emit count:`, payload)
            // res.write(`event: count\n` +
            //           `data: ${payload}\n\n`)

        }
    }
}
