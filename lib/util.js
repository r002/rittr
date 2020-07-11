// lib/util.js
// Miscellaneous util funcitons.
// ========

const { exec } = require('child_process')

// https://medium.com/@ali.dev/how-to-use-promise-with-exec-in-node-js-a39c4d7bbf77
execShellCommand = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error)
            }
            resolve(stdout ? stdout : stderr)
        })
    })
}

module.exports = {
    // Reset the test database.
    reset_db : async () => {
        console.log(" ~~ Resetting the test db! ~~ ")
        const info = await execShellCommand('powershell -command "& ./lib/reset_db.ps1"')
        console.log("reset db info:", info)
        return {"status": 1}
    }
}
