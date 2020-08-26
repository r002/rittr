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
        document.querySelector('#flash-header')
        .innerHTML = `Email sent to: <strong>${email}</strong>. Please check your inbox.`
    } else {
        document.querySelector('#flash-header')
        .innerHTML = `Sorry, an error occurred: <strong>${rs.errMsg}</strong>`
    }

}

// TODO - Perform more field validation (like checking for empty fields) before allowing submission. 8/26/20
const node = document.querySelector('#sovereignty')
node.addEventListener("keyup", _ => {
    if (event.key === "Enter") {
        if (validate_email()) {
            // console.log("enter key struck and email valid!!!!")
            create_account()
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
        document.querySelector('#notice').innerHTML = "❌ Please enter a valid email address."
    } else {
        document.querySelector('#notice').innerHTML = "✔️ Good job! This is a valid email address."
    }
    return passed
}

history.pushState({}, "", "/create")  // Change the url in the address bar.