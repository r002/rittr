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
let clients = {}  // Maps client_id => client objects

module.exports = class Monitor {

    constructor()
    {
        instance = this
    }

    add_client(client) {
        client.ts = Date.now()
        clients[client.id] = client

        console.log("******* All connected clients", clients)
    }

    broadcast(edict) {

    }

    // Ping all connected clients and request a heartbeat.
    // If the client doesn't pong back, evict them.
    ping_checks() {

    }

    static get_instance() {
        return instance || new Monitor()
    }
}
