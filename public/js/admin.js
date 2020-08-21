/*
========
admin.js
========
*/

const urlParams = new URLSearchParams(window.location.search)
const user_id = urlParams.get('id')
const otp = urlParams.get('otp')

const client_id = Math.floor((Math.random() * 100) + 1)

const root = "http://localhost:5000"

// Perform initial registration with the server
const source = new EventSource(`${root}/v1/user/${user_id}/pipeline/${client_id}?mode=admin`)

source.addEventListener('flash', message => {
    console.log(`"flash event" received:`, message)
    document.querySelector('#flashes_received').innerHTML = event.data
})

source.addEventListener('clientMap', message => {
    console.log(`"clientMap event" received:`, message)
    let clientMap = JSON.parse(event.data)
    let s = []
    let i = 1

    s.push(`<div class="grid-container">
            <div class="grid-item title">Conn #</div>
            <div class="grid-item title">Client Id</div>
            <div class="grid-item title">User Id</div>
            <div class="grid-item title">Mode</div>
            <div class="grid-item title">Last Heartbeat</div>
            <div class="grid-item title">Status</div>`)
    clientMap.forEach(client => {
        s.push(`<div class="grid-item">${i++}</div>
                <div class="grid-item">${client.id}</div>
                <div class="grid-item">${client.user_id}</div>
                <div class="grid-item">${client.mode}</div>
                <div class="grid-item">${client.dt}</div>
                <div class="grid-item ${client.status}">${client.status}</div>`)
    })
    s.push("</div>")
    document.querySelector('#clientMap').innerHTML = s.join("")
})

request_client_heartbeats = async _ => {
    let res = await fetch(`/v1/admin/${user_id}/clientmap_refresh?otp=${otp}`)
    let rs = await res.json()
    console.log("request_client_heartbeats: ", rs)
}

broadcast_flash = async _ => {
    let flash_broadcast = document.querySelector('#flash_broadcast').value
    // console.log("#law:", law)

    let req = {
        "user_id": user_id,
        "otp": otp,
        "flash_broadcast": flash_broadcast
    }

    let res = await fetch(`/v1/admin/${user_id}/flash_broadcast?otp=${otp}`, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    let rs = await res.json()
    console.log("fetch returned: ", rs)

    // if(1==rs.status) {
    //     document.querySelector('#msg_area')
    //     .innerHTML = `Edict promulgated!<br />`
    //                   + `Good job!`
    //     show_edicts()  // Refresh edicts list on 'dash' view.
    // } else {
    //     document.querySelector('#msg_area')
    //     .innerHTML = `Sorry, error occurred.<br />`
    //                   + `Error: <strong>${rs.errMsg}</strong>`
    // }
}


heartbeat = async _ => {
    let res = await fetch(`/v1/user/${user_id}/heartbeat/${client_id}?mode=admin&otp=${otp}`)
    let rs = await res.json()
    document.querySelector('#cid').innerHTML =
        `<strong>Connected to Server!<br />Status:</strong>${JSON.stringify(rs)}`
}

// Listen for ping from the Server.
// If the server pings, send a pong back.
source.addEventListener('ping', message => {
    console.log(`"ping event" received:`, message)
    document.querySelector('#ping').innerHTML = event.data

    heartbeat()
    console.log("**** pong clientId", client_id)
})

// Listen for edicts from the Server.
source.addEventListener('edict', message => {
    console.log(`"edict event" received:`, message)
    document.querySelector('#edicts').innerHTML = event.data
})

// // Perform initial registration with the server
// heartbeat()
