/*
========
client.js

Responsible for registering with the server to establish a pipeline for
SSE communication. Will also respond to server requests for heartbeats.
========
*/

const ROOT = window.location.origin
const urlParams = new URLSearchParams(window.location.search)
const user_id = urlParams.get('id')
const otp = urlParams.get('otp')
const client_id = Math.floor((Math.random() * 100) + 1)
var source = null

heartbeat = async (mode) => {
    let res = await fetch(`${ROOT}/v1/user/${user_id}/heartbeat/${client_id}?mode=${mode}&otp=${otp}`)
    let rs = await res.json()
    // document.querySelector('#flash-header').innerHTML =
    //     `<strong>Heartbeat sent to Server! Status:</strong> ${JSON.stringify(rs)}`

    document.querySelector('#connection-details').innerHTML =
        `Last Heartbeat: <span class='bold'>${rs.dt}</span> | Client Id: <span class='bold'>${client_id}</span> | ` +
        `User Id: <span class='bold'>${user_id}</span> | Connection Status: 🟢`
}

initialize_pipeline = mode => {
    source = new EventSource(`${ROOT}/v1/user/${user_id}/pipeline/${client_id}?mode=${mode}`)
    document.querySelector('#flash-header').innerHTML = 
        `<strong>Connected to Server! Client Id: </strong> ${client_id}`
    // document.querySelector('#client_id').innerHTML = `<strong>Client Id:</strong> ${client_id}`

    source.addEventListener('flash', message => {
        console.log(`"flash event" received:`, message)
        document.querySelector('#flash-header').innerHTML = event.data
    })

    // Listen for ping from the Server.  If the server pings, send a pong back.
    source.addEventListener('ping', message => {
        console.log(`"ping event" received:`, message)
        // document.querySelector('#ping').innerHTML = event.data

        heartbeat(mode)
        console.log("**** pong clientId", client_id)
    })
}