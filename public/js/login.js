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
        document.querySelector('#flash-header')
        .innerHTML = `Email sent to: <strong>${login_email}</strong>. Please check your inbox.`
    } else {
        document.querySelector('#flash-header')
        .innerHTML = `Sorry, no user with this email found: <strong>${login_email}</strong>`
    }
}

const node = document.querySelector('#login_email')
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
    let email = document.querySelector('#login_email').value
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let passed = re.test(String(email).toLowerCase())
    if (!passed) {
        document.querySelector('#notice').innerHTML = "❌ Please enter a valid email address."
    } else {
        document.querySelector('#notice').innerHTML = "✔️ Good job! Press enter and please check your inbox for the login email."
    }
    return passed
}

history.pushState({}, "", "/login")  // Change the url in the address bar.