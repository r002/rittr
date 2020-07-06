const db = require('../services/db')


module.exports = {

    create_user : async (user) => {
        // console.log(`>>>>> create_user(...) called!`, user)

        if (!validate(user)) {
            let rs = { "status": 0 }
            rs.errCode = "ERR-003"
            rs.errMsg  = "ERR-003: Invalid 'user.name' or 'user.email' field."
            return rs
        }

        let query = 'INSERT INTO users (name, email, sovereignty) VALUES ($1, $2, $3) ' +
                    'RETURNING *'
        let rs = await db.query(query, [user.name, user.email, user.sovereignty])
        // console.log("%%% what is rs?", rs)
        if (0 == rs.status) {
            // Hydrate the error object with pertinent details.
            // console.log("%%% error has occurred!", rs)
            if ("users_email_key"==rs.errObj.constraint)
            {
                rs.errCode = "ERR-002"
                rs.errMsg  = "ERR-002: Non-unique email address."
            }
        }
        return rs
    },

    get_user_by_id : async (id) => {
        let rs = await db.query('SELECT * FROM users WHERE id = $1', [id])
        // console.log(" **** get_user_by_id", rs)
        return rs.payload[0]
    },

    get_user_by_email : async (email) => {
        let rs = await db.query('SELECT * FROM users WHERE email = $1', [email])
        // console.log(" **** get_user_by_email", rs)
        return rs.payload[0]
    },

    // Weird... doesn't fail when the user id doesn't exist. Investigate later. 7/4/20
    delete_user : async (id) => {
        // console.log(`>>>>> delete_user(...) called!`, id)
        let rs = await db.query('DELETE FROM users WHERE id = $1', [id])
        return rs
    },
}

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
validate = (user) => {
    if (""===user.name.trim()){
        return false
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(user.email).toLowerCase())
}
