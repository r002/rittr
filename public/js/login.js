create_account = async () => {
    let title = document.querySelector('#title').value
    let name = document.querySelector('#name').value
    let sovereignty = document.querySelector('#sovereignty').value
    let email = document.querySelector('#email').value
    let req = {
        "title": title,
        "name": name,
        "sovereignty": sovereignty,
        "email": email
    }
    // console.log(req)
    let res = await fetch(`/v1/user`, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    let rs = await res.json()
    // console.log(rs)

    if(1==rs.status) {
        document.querySelector('#msg_area_create')
        .innerHTML = `Email sent to: <strong>${email}</strong>.<br />`
                      + `Please check your inbox.`
    } else {
        document.querySelector('#msg_area_create')
        .innerHTML = `Sorry, an error occurred:<br />`
                      + `<strong>${rs.errMsg}</strong>`
    }

}


login = async () => {
    let login_email = document.querySelector('#login_email').value
    // console.log("#login_email:", login_email)
    let req = { "email": login_email }

    let res = await fetch(`/v1/otp_token`, {
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
        .innerHTML = `Email sent to: <strong>${login_email}</strong>.<br />`
                      + `Please check your inbox.`
    } else {
        document.querySelector('#msg_area')
        .innerHTML = `Sorry, no user with this email found:<br />`
                      + `<strong>${login_email}</strong>`
    }
}
