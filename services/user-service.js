const db = require('../services/db')


module.exports = {

    create_user : async (user) => {
        // console.log(`>> create_user(...) called!`, user)

        // TODO: Validate the fields. Reject call if any invalid fields found.

        let query = 'INSERT INTO users (name, email, sovereignty) VALUES ($1, $2, $3) ' +
                    'RETURNING *'
        let rs = await db.query(query, [user.name, user.email, user.sovereignty])
        // console.log("%%% what is rs?", rs)
        if (0 == rs.status) {
            // Hydrate the error object with pertinent details.
            // console.log("%%% error has occurred!", rs)
            if ("users_email_key"==rs.errObj.constraint)
            {
                rs.errCode = "ERR-001"
                rs.errMsg  = "ERR-001: Non-unique email address."
            }
        }
        return rs
    },

    get_user : async (id) => {
        // console.log(`>>>>> get_user(...) called!`, id)
        let rows = await db.query('SELECT * FROM users WHERE id = $1', [id])
        return rows[0]
    },


    // Weird... doesn't fail when the user id doesn't exist. Investigate later. 7/4/20
    delete_user : async (id) => {
        // console.log(`>>>>> delete_user(...) called!`, id)
        let rs = await db.query('DELETE FROM users WHERE id = $1', [id])
        return rs
    },
}
