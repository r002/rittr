/*
========
dash.js
========
*/

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
    } else {
        document.querySelector('#msg_area')
        .innerHTML = `Sorry, error occurred.<br />`
                      + `Error: <strong>${rs.errMsg}</strong>`
    }
}
