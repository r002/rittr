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

toggle_arr = source => {
    // console.log(">>> toggle_arr", source.checked)
    let clients = document.getElementsByName('client')
    for (let cb=0; cb<clients.length; cb++)
    {
        clients[cb].checked = source.checked
    }
    calc_toggled()
}

calc_toggled = _ => {
    // If all clients are checked, check the 'toggle_all_clients' cb too.
    // Else, uncheck the 'toggle_all_clients' cb.
    let checked_no = document.querySelectorAll('input[name="client"]:checked').length
    // console.log(">>> clients.checked #?", checked_no)
    if (0==checked_no) {
        // console.log("$$ Disable button!")
        document.querySelector('#btn_broadcast').disabled = true
    } else {
        // console.log("$$ Enable button!")
        document.querySelector('#btn_broadcast').disabled = false
    }
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
                <div class="grid-item title">
                    <input type="checkbox" id="toggle_all_clients" onClick="toggle_arr(this)" checked>
                </div>
                <div class="grid-item title">Conn #</div>
                <div class="grid-item title">Client Id</div>
                <div class="grid-item title">User Id</div>
                <div class="grid-item title">Mode</div>
                <div class="grid-item title">Last Heartbeat</div>
                <div class="grid-item title">Status</div>`)
    clientMap.forEach(c => {
        s.push(`<div class="grid-item">
                    <input type="checkbox" name="client" id="${c.id}_${c.user_id}_${c.mode}" onClick="calc_toggled()" checked>
                </div>
                <div class="grid-item">${i++}</div>
                <div class="grid-item">${c.id}</div>
                <div class="grid-item">${c.user_id}</div>
                <div class="grid-item">${c.mode}</div>
                <div class="grid-item">${c.dt}</div>
                <div class="grid-item ${c.status}">${c.status}</div>`)
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

    // Identify all checked checkboxes
    let clients = document.getElementsByName('client')
    let blast_targets = []
    for (let cb=0; cb<clients.length; cb++)
    {
        if (clients[cb].checked) {
            console.log(">> CHECKED: ", clients[cb].id)
            blast_targets.push(clients[cb].id)
        }
    }
    console.log(">> blast_targets: ", blast_targets)

    let req = {
        user_id: user_id,
        otp: otp,
        flash_broadcast: flash_broadcast,
        blast_targets: blast_targets
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