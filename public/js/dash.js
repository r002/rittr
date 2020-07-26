/*
========
dash.js
========
*/

show_edicts = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const user_id = urlParams.get('id')
    const otp = urlParams.get('otp')

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

promulgate = async () => {
    let law = document.querySelector('#law').value
    // console.log("#law:", law)

    const urlParams = new URLSearchParams(window.location.search)
    const user_id = urlParams.get('id')
    const otp = urlParams.get('otp')

    let req = {
        "user_id": user_id,
        "otp": otp,
        "law": law
    }

    let res = await fetch(`/v1/edict`, {
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

show_edicts()
