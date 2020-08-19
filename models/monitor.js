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

module.exports = class Monitor {

    constructor()
    {
        instance = this
    }

    add_client(client) {
        client.ts = Date.now()
        clients.set(client.to_key(), client)

        this.broadcast_clientmap()
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
        for (const [client_id, client] of clients)
        {
            // Ping the client for a pong.
            client.res.write(`event: ping\n` +
                             `data: {"dummy": "dummy"}\n\n`)
        }
        this.broadcast_clientmap()
    }

    purge_zombies() {
        for (const [client_id, client] of clients)
        {
            // Ping the client for a pong.
            client.res.write(`event: request_pong\n` +
                             `data: {"dummy": "dummy"}\n\n`)
        }
    }

    // broadcast(edict) {
    //     for (const [client_id, client] of clients)
    //     {
    //         // console.log(`key: ${client_id}, value: ${JSON.stringify(client)}`)
    //         client.res.write(`event: edict\n` +
    //                          `data: {"edict": "Here is a test edict!"}\n\n`)
    //     }
    // }

    static get_instance() {
        return instance || new Monitor()
    }
}
