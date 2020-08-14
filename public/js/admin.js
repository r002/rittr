/*
========
admin.js
========
*/

const urlParams = new URLSearchParams(window.location.search)
const user_id = urlParams.get('id')
const otp = urlParams.get('otp')

const client_id = Math.floor((Math.random() * 100) + 1)

const root = "http://localhost:5000"

// Perform initial registration with the server
const source = new EventSource(`${root}/v1/user/${user_id}/pipeline/${client_id}`)

// source.addEventListener('clients', message => {
//     console.log(`"clients event" received:`, message)
//     document.querySelector('#clients').innerHTML = event.data
// })
//
// heartbeat = async _ => {
//     let res = await fetch(`/v1/user/${user_id}/heartbeat/${client_id}?otp=${otp}`)
//     let rs = await res.json()
//     document.querySelector('#cid').innerHTML =
//         `<strong>Connected to Server!<br />Status:</strong>${JSON.stringify(rs)}`
// }

// // Listen for ping from the Server.
// // If the server pings, send a pong back.
// source.addEventListener('ping', message => {
//     console.log(`"ping event" received:`, message)
//     document.querySelector('#ping').innerHTML = event.data
//
//     heartbeat()
//     console.log("**** pong clientId", client_id)
// })

// Listen for edicts from the Server.
source.addEventListener('edict', message => {
    console.log(`"edict event" received:`, message)
    document.querySelector('#edicts').innerHTML = event.data
})

// // Perform initial registration with the server
// heartbeat()
