/*
========
client.js

Responsible for registering with the server to establish a pipeline for
SSE communication. Will also respond to server requests for heartbeats.
========
*/

const urlParams = new URLSearchParams(window.location.search)
const user_id = urlParams.get('id')
const otp = urlParams.get('otp')
const client_id = Math.floor((Math.random() * 100) + 1)

heartbeat = async _ => {
    let res = await fetch(`${ROOT}/v1/user/${user_id}/heartbeat/${client_id}?mode=normal&otp=${otp}`)
    let rs = await res.json()
    document.querySelector('#flash-header').innerHTML =
        `<strong>Heartbeat sent to Server! Status:</strong> ${JSON.stringify(rs)}`
}

initialize_pipeline = _ => {
    const source = new EventSource(`${ROOT}/v1/user/${user_id}/pipeline/${client_id}`)
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

        heartbeat()
        console.log("**** pong clientId", client_id)
    })
}

initialize_pipeline()