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
        clients.set(client.id, client)
        this.print_connected_clients()
    }

    print_connected_clients() {
        console.log("******* Connected clients count:", clients.size)
        for (const [client_id, client] of clients)
        {
            console.log(JSON.stringify({
                client_id: client.id,
                user_id: client.user_id,
                ts: client.ts,
            }))
        }
    }

    broadcast(edict) {
        for (const [client_id, client] of clients)
        {
            // console.log(`key: ${client_id}, value: ${JSON.stringify(client)}`)
            client.res.write(`event: edict\n` +
                             `data: {"edict": "Here is a test edict!"}\n\n`)
        }
    }

    // Ping all connected clients and request a heartbeat.
    // If the client doesn't pong back, evict them.
    ping_checks() {

    }

    static get_instance() {
        return instance || new Monitor()
    }
}
