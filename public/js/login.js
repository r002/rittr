
login = () => {
    let login_email = document.querySelector('#login_email').value
    console.log("#login_email:", login_email)

    // TODO: Make JSON REST API POST call here to send otp email to the
    // user if the user exists. If user doesn't exist, display:
    // "Sorry, no user with that email found." message.

    document.querySelector('#msg_area')
    .innerHTML = `Email sent to: <strong>${login_email}</strong>.
                  Please check your inbox.`;
}

// fetchAsync = async (url) => {
//     let response = await fetch(url);
//     let data = await response.text();
//     // let data = await response.json();
//     return data;
// }
