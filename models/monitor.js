/*
./models/monitor.js

This is a singleton object that keeps track of all connected clients.
Features:
    - Add a client.
    - Broadcast tweets to all clients.
    - Ping a heartbeat request to all clients.
    - Evict clients who are no longer 'ponging' back to heartbeat pings.
========
*/

let instance = null
let clients = new Map()  // Maps client_id => client objects
let loopRunning = false
let evictionLoop = null
let refreshLoop = null
const REFRESH_INTERVAL = Number(process.env.REFRESH_INTERVAL)
const EVICTION_INTERVAL = Number(process.env.EVICTION_INTERVAL)

module.exports = class Monitor {

    static get_instance() {
        return instance || new Monitor()
    }

    constructor() {
        instance = this
    }

    add_client(client) {
        client.ts = Date.now()
        client.status = "connected"
        clients.set(client.to_key(), client)

        this.maintain_map()
    }

    del_client(client_key) {
        clients.delete(client_key)
        this.maintain_map()
    }

    maintain_map() {
        
        if (clients.size==0) {
            console.log(">>>>> disable maintainLoop!")
            clearInterval(evictionLoop)
            clearInterval(refreshLoop)
            loopRunning = false
            this.broadcast_clientmap()
        } else if (clients.size>0 && !loopRunning) {
            // This block will only run ONCE the very first time maintainLoop fires.
            console.log(">>>>> start maintainLoop! Broadcast one-off clientmap!")
            this.broadcast_clientmap()
            loopRunning = true
            evictionLoop = setInterval( _ => {
                console.log(">>>> fire evictionLoop!", Date.now())
                this.evict_stale_clients()
                }, EVICTION_INTERVAL)  // 25000

            refreshLoop = setInterval( _ => {
                console.log(">>>> fire refreshLoop!", Date.now())
                this.refresh_clientmap()
                }, REFRESH_INTERVAL)  // 10000

        } else {
            // This block fires if the Admin GUI is reloaded after already being initialized.
            console.log(">>>>> maintainLoop already running. do nothing.")
        }
    }

    evict_stale_clients() {
        console.log("^^^ Checking for stale clients...")
        let now = Date.now()
        let evictionHappened = false
        for (const [client_key, client] of clients)
        {
            if ((now - client.ts)>(EVICTION_INTERVAL-5000)) {  // 20000
                console.log("^^^ Client evicted! client_key: ", client_key)
                this.del_client(client_key)
                evictionHappened = true
                console.log("^^^ Current clients count:", clients.size)
            }
        }
        if (evictionHappened) {
            this.broadcast_clientmap()
        } else {
            console.log("^^^ No clients evicted this time!")
        }
    }

    heartbeat(c) {
        console.log("$$$$$$$$$$ Getting client key:", c.to_key())
        let client = clients.get(c.to_key())
        client.ts = Date.now()
        this.broadcast_clientmap()
        return {
            status: 1,
            dt: client.dt()  // human-readable ts of most recent heartbeat
        }
    }

    broadcast_flash(flash_broadcast) {
        for (const [client_id, client] of clients)
        {
            // console.log(`key: ${client_id}, value: ${JSON.stringify(client)}`)
            client.res.write(`event: flash\n` +
                             `data: {"flash": ${flash_broadcast}}\n\n`)
        }
    }

    broadcast_clientmap() {
        console.log("******* Connected clients count:", clients.size)
        let arr = Array.from(clients.values()).map(_=>_.to_obj())
        console.log(JSON.stringify(arr, null, 2))

        // arr = Array.from(clients.values())
        for (const [client_id, client] of clients)
        {
            client.res.write(`event: clientMap\n` +
                             `data: ${JSON.stringify(arr)}\n\n`)
        }
    }

    // Iterate the clientmap to update client statuses.
    refresh_clientmap() {
        let now = Date.now()
        for (const [client_id, client] of clients)
        {
            if ((now-client.ts)>(REFRESH_INTERVAL+5000)) {  // 15000
                client.status = "stale"
            }
            // Ping the client for a pong.
            client.res.write(`event: ping\n` +
                             `data: {"dummy": "dummy"}\n\n`)
        }
        // this.broadcast_clientmap()  // Not neccessary? 8/20/20
    }

    // broadcast(edict) {
    //     for (const [client_id, client] of clients)
    //     {
    //         // console.log(`key: ${client_id}, value: ${JSON.stringify(client)}`)
    //         client.res.write(`event: edict\n` +
    //                          `data: {"edict": "Here is a test edict!"}\n\n`)
    //     }
    // }


}
