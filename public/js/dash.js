/*
========
dash.js
========
*/

const urlParams = new URLSearchParams(window.location.search)
const user_id = urlParams.get('id')
const otp = urlParams.get('otp')
const client_id = Math.floor((Math.random() * 100) + 1)
const root = "http://localhost:5000"

heartbeat = async _ => {
    let res = await fetch(`/v1/user/${user_id}/heartbeat/${client_id}?mode=normal&otp=${otp}`)
    let rs = await res.json()
    document.querySelector('#flash').innerHTML =
        `<strong>Connected to Server!<br />Status:</strong>${JSON.stringify(rs)}`
}

initialize_pipeline = _ => {
    const source = new EventSource(`${root}/v1/user/${user_id}/pipeline/${client_id}`)
        document.querySelector('#flash').innerHTML = `<strong>Connected to Server!</strong>`
        document.querySelector('#client_id').innerHTML = `<strong>Client Id:</strong> ${client_id}`

    source.addEventListener('flash', message => {
        console.log(`"flash event" received:`, message)
        document.querySelector('#flashes_received').innerHTML = event.data
    })

    // Listen for ping from the Server.  If the server pings, send a pong back.
    source.addEventListener('ping', message => {
        console.log(`"ping event" received:`, message)
        // document.querySelector('#ping').innerHTML = event.data

        heartbeat()
        console.log("**** pong clientId", client_id)
    })
}

// register = async _ => {
//     const client_id = Math.floor((Math.random() * 100) + 1)
//
//     let res = await fetch(`/v1/user/${user_id}/heartbeat/${client_id}?otp=${otp}`)
//     let rs = await res.json()
//     document.querySelector('#cid').innerHTML =
//         `<strong>Connected to Server!<br />Status:</strong>${JSON.stringify(rs)}`
// }

follow = async (alpha_id) => {
    let res = await fetch(`/v1/user/${user_id}/alpha/${alpha_id}?otp=${otp}`, {
            method: 'POST'
        })
    let rs = await res.json()
    if(1==rs.status) {
        show_others()
        show_alphas()
        show_edictstream()
    } else {
        // Convert to a flash message later.
        alert("Error occurred following!")
    }
}

unfollow = async (alpha_id) => {
    let res = await fetch(`/v1/user/${user_id}/alpha/${alpha_id}?otp=${otp}`, {
            method: 'DELETE'
        })
    let rs = await res.json()
    if(1==rs.status) {
        show_others()
        show_alphas()
        show_edictstream()
    } else {
        // Convert to a flash message later.
        alert("Error occurred unfollowing!")
    }
}

show_alphas = async _ => {
    let res = await fetch(`/v1/user/${user_id}/alphas?otp=${otp}`)
    let rs = await res.json()
    // console.log("$$$ rs", rs)

    let alphas = []
    rs.alphas.forEach( alpha => {
        alphas.push(`<li>${alpha.id} | ${alpha.name} | ${alpha.sovereignty} | ${alpha.avatar}
                    | ${alpha.created_on}
                    | <a href="javascript:unfollow(${alpha.id})">Unfollow</a></li>`)
    })
    document.querySelector('#alphas')
    .innerHTML = alphas.join("")
}

show_others = async _ => {
    let res = await fetch(`/v1/user/${user_id}/others?otp=${otp}`)
    let rs = await res.json()
    // console.log("$$$ rs", rs)

    let others = []
    rs.others.forEach( other => {
        others.push(`<li>${other.id} | ${other.name} | ${other.sovereignty}
                    | <a href="javascript:follow(${other.id})">Follow</a></li>`)
    })
    document.querySelector('#others')
    .innerHTML = others.join("")
}

show_edicts = async _ => {
    let res = await fetch(`/v1/user/${user_id}/edicts?otp=${otp}`)
    let rs = await res.json()
    // console.log("$$$ rs", rs)

    let edicts = []
    rs.edicts.forEach( e => {
        edicts.push(`<li>${e.id} | ${e.law} | ${e.created_on}</li>`)
    })
    document.querySelector('#edicts')
    .innerHTML = edicts.join("")
}

// Initial load the EdictStream via a GET call
initialload_edictstream = async _ => {
    let res = await fetch(`/v1/user/${user_id}/edictstream?otp=${otp}`)
    let rs = await res.json()
    // console.log("$$$ rs", rs)

    let edictstream = []
    rs.edictstream.forEach( e => {
        edictstream.push(`
            <div class="edict-card">
                <div class="avatar">
                    <img src="img/${e.avatar}" width="105px" /><br />
                    ${e.name}<br />
                    ${e.sovereignty}
                </div>
                <div class="edict">${e.law}</div>
                <div class="date"><a href='${e.ref}'>${new Date(e.created_on)}</a></div>
            </div>`)
    })
    document.querySelector('#edictstream')
    .innerHTML = edictstream.join("")
}

promulgate = async _ => {
    let law = document.querySelector('#law').value
    // console.log("#law:", law)

    let req = {
        "user_id": user_id,
        "otp": otp,
        "law": law
    }

    let res = await fetch(`/v1/user/${user_id}/edict?otp=${otp}`, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    let rs = await res.json()
    // console.log("fetch returned: ", rs)

    if(1==rs.status) {
        document.querySelector('#msg_area')
        .innerHTML = `Edict promulgated!<br />`
                      + `Good job!`
        show_edicts()  // Refresh edicts list on 'dash' view.
    } else {
        document.querySelector('#msg_area')
        .innerHTML = `Sorry, error occurred.<br />`
                      + `Error: <strong>${rs.errMsg}</strong>`
    }
}

initialize_pipeline()
show_others()
show_alphas()
show_edicts()
initialload_edictstream()
