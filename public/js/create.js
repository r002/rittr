create_account = async _ => {
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

const node = document.querySelector('#email')
node.addEventListener("keyup", _ => {
    if (event.key === "Enter") {
        if (validate_email()) {
            // console.log("enter key struck and email valid!!!!")
            login()
            document.querySelector('#notice').innerHTML = "📨 Login email sent! Please check your inbox."
        }
    } else {
        validate_email()
    }
})

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
validate_email = _ => {
    let email = document.querySelector('#email').value
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let passed = re.test(String(email).toLowerCase())
    if (!passed) {
        document.querySelector('#notice').innerHTML = "❌ Please enter a valid email."
    } else {
        document.querySelector('#notice').innerHTML = "✔️ Good job! Press enter and please check your inbox for the login email."
    }
    return passed
}

history.pushState({}, "", "/create")  // Change the url in the address bar.