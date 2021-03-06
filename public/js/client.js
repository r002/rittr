/*
========
client.js

Responsible for registering with the server to establish a pipeline for
SSE communication. Will also respond to server requests for heartbeats.
========
*/

const ROOT = window.location.origin
const urlParams = new URLSearchParams(window.location.search)

const otp = urlParams.get('otp')
const client_id = Math.floor((Math.random() * 100) + 1)
var source = null
var hb_rs = {dt:"N/A"}

heartbeat = async (mode) => {
    let res = await fetch(`${ROOT}/v1/user/${user_id}/heartbeat/${client_id}?mode=${mode}&otp=${otp}`)
    hb_rs = await res.json()
    // document.querySelector('#flash-header').innerHTML =
    //     `<strong>Heartbeat sent to Server! Status:</strong> ${JSON.stringify(hb_rs)}`

    document.querySelector('#connection-details').innerHTML =
        `Last Heartbeat: <span class='bold'>${hb_rs.dt}</span> | Client Id: <span class='bold'>${client_id}</span> | ` +
        `User Id: <span class='bold'>${user_id}</span> | Connection Status: 🟢`
}

initialize_pipeline = mode => {
    source = new EventSource(`${ROOT}/v1/user/${user_id}/pipeline/${client_id}?mode=${mode}`)
    document.querySelector('#flash-header').innerHTML = 
        `<strong>Connected to Server! Client Id: </strong> ${client_id}`
    // document.querySelector('#client_id').innerHTML = `<strong>Client Id:</strong> ${client_id}`

    source.addEventListener('flash', message => {
        console.log(`"flash event" received:`, message)
        let f = JSON.parse(event.data)
        let s = `<span id='flash-alert'>FLASH ANNOUNCEMENT</span> ` +
                `<span id='flash-date'>${f_dt_detailed(Date())}</span> ` +
                `<span id='flash-message'>${f.flash}</span>`
        document.querySelector('#flash-header').innerHTML = s
    })

    // Listen for ping from the Server.  If the server pings, send a pong back.
    source.addEventListener('ping', message => {
        console.log(`"ping event" received:`, message)
        // document.querySelector('#ping').innerHTML = event.data

        heartbeat(mode)
        console.log("**** pong clientId", client_id)
    })

    // Handle when the server connection dies.
    source.onerror = _ => {
        document.querySelector('#connection-details').innerHTML =
        `Last Heartbeat: <span class='bold'>${hb_rs.dt}</span> | Client Id: <span class='bold'>${client_id}</span> | ` +
        `User Id: <span class='bold'>${user_id}</span> | Connection Status: 🔴`
    }

    // Handle when the server connection opens.
    source.onopen = _ => {
        document.querySelector('#connection-details').innerHTML =
        `Last Heartbeat: <span class='bold'>${hb_rs.dt}</span> | Client Id: <span class='bold'>${client_id}</span> | ` +
        `User Id: <span class='bold'>${user_id}</span> | Initializing Connection: ⌛`

        // Send ONE heartbeat back to the server to confirm that client has successfully registered.
        heartbeat(mode)
        console.log(">> Initial client registration succeeded! clientId: ", client_id)
    }
}