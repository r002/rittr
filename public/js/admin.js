/*
========
admin.js

Backs 'admin.ejs'.
========
*/

initialize_pipeline("admin")

let log_id = 1
let deq = []

add_log = (log_item) => {
    deq.push(log_item)
    if (deq.length>7) {  // Only keep the seven most recent log items
        deq.shift()
    }
    document.querySelector('#console').innerHTML = deq.join("\n\n")
    // Keep the textarea console scrolled to bottom:
    document.querySelector('#console').scrollTop = document.querySelector('#console').scrollHeight 
}

source.addEventListener('clientMap', message => {

    // console.log(`"clientMap event" received:`, message)
    let dt = new Date()
    let log_item = `${log_id++}. ${dt}: \n` +
            `\t "clientMap event" received: \n` +
            `\t ${message.data}`
    add_log(log_item)

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

toggle_auto_prune = async (bool) => {
    let command = {
        "enable": bool
    }

    let res = await fetch(`/v1/admin/${user_id}/toggle_auto_prune?otp=${otp}`, {
        method: 'POST',
        body: JSON.stringify(command),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    let rs = await res.json()

    add_log(`>> auto-prune-loop-enabled: ${rs.enabled}`)
    console.log(">> auto-prune-loop-status: ", rs)
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


// Listen for edicts from the Server.
source.addEventListener('edict', message => {
    console.log(`"edict event" received:`, message)
    document.querySelector('#edicts').innerHTML = event.data
})

////////////////////////////////////////////////////

toggle = _ => {
    let checked = document.querySelector('#toggleButton').checked
    console.log("toggle state: ", checked)
    toggle_auto_prune(checked)
}