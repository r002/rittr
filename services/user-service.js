/*
========
./services/user-service.js
Responsible for all UserService methods (Create, Retrieve, Update, Delete, API methods).
========
*/

const db = require('../services/db')
const c = require('../models/constants')
const authService = require('../services/auth-service')

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
validate = (user) => {
    if (""===user.name.trim()){
        return false
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(user.email).toLowerCase())
}

create_user = async (user) => {
    let rs = { "status": 0 }
    if (!validate(user)) {
        rs.errCode = "ERR-U03"
        rs.errMsg  = c.ERR_U03_INVAL_USER_FIELD
        return rs
    }

    let query = 'INSERT INTO users (name, email, sovereignty) VALUES ($1, $2, $3) ' +
                'RETURNING *'
    let db_rs = await db.query(query, [user.name, user.email, user.sovereignty])
    // console.log("%%% what is rs?", rs)
    if (0 == db_rs.status) {
        // Hydrate the error object with pertinent details.
        // console.log("%%% error has occurred!", rs)
        if ("users_email_key"==db_rs.errObj.constraint) {
            rs.errCode = "ERR-U02"
            rs.errMsg  = c.ERR_U02_NON_UNIQUE_EMAIL
        }
    } else {
        rs.status = db_rs.status
        rs.payload = db_rs.payload
        let auth_rs = await authService.email_otp(rs.payload[0])  // Comment this to disable email sending.
    }
    return rs
}

get_users = async _ => {
    let rs = await db.query('SELECT * FROM users')
    return rs.payload
    // return rs.payload.map(row => create_user(row))
}

get_others = async (user_id) => {
    let rs = await db.query('SELECT * FROM users WHERE id !=$1 AND id NOT IN ' +
                            '(SELECT u.id FROM alphas AS a INNER JOIN users AS u ' +
                            'ON a.alpha_id=u.id WHERE a.user_id=$1) ' +
                            'ORDER BY created_on DESC', [user_id])
    // console.log("****** get_others rs", rs)
    return rs.payload
}

get_alphas = async (user_id) => {
    let rs = await db.query('SELECT u.id, u.name, u.sovereignty, a.created_on FROM alphas AS a ' +
                            'INNER JOIN users AS u ON a.alpha_id=u.id ' +
                            'WHERE a.user_id=$1 ORDER BY u.created_on DESC', [user_id])
    return rs.payload
}

create_alpha = async (alpha) => {
    let query = 'INSERT INTO alphas (user_id, alpha_id, otp_id) VALUES ($1, $2, $3) ' +
                'ON CONFLICT (user_id, alpha_id) ' +
                'DO NOTHING ' +
                'RETURNING *'
    let db_rs = await db.query(query, [alpha.user_id, alpha.alpha_id, alpha.otp_id])
    let rs = { "status": 0 }
    if (0 == db_rs.status) {
        rs.errMsg  = c.ERR_A01_PROB_CREATE_ALPHA
    } else {
        rs.status = 1
    }
    return rs
}

delete_alpha = async (alpha) => {
    let query = 'DELETE FROM alphas WHERE user_id=$1 AND alpha_id=$2 ' +
                'RETURNING *'
    let db_rs = await db.query(query, [alpha.user_id, alpha.alpha_id])
    let rs = { "status": 0 }
    if (0 == db_rs.status) {
        rs.errMsg  = c.ERR_A02_PROB_DELETE_ALPHA
    } else {
        rs.status = 1
    }
    return rs
}

module.exports = {
    create_user,
    create_user_api : async (req, res) => {
        // console.log("create_user_api - Received: ", req.body)
        let user = req.body
        rs = await create_user(user)
        res.set('Content-Type', 'application/json; charset=UTF-8')
        res.send(JSON.stringify(rs))
    },

    create_alpha_api : async (req, res) => {
        // console.log("create_alpha_api - Received: ", req.body)
        let alpha = {
            "user_id": req.params.uid,
            "alpha_id": req.params.aid,
            "otp_id": req.body.otp_id
        }
        rs = await create_alpha(alpha)
        res.json(rs)
    },

    delete_alpha_api : async (req, res) => {
        let alpha = {
            "user_id": req.params.uid,
            "alpha_id": req.params.aid
        }
        rs = await delete_alpha(alpha)
        res.json(rs)
    },

    get_alphas_api : async (req, res) => {
        let rs = { "status": 1 }
        rs.alphas = await get_alphas(req.params.uid)
        res.json(rs)
    },

    // Gets all other users that uid is currently not following.
    get_others_api : async (req, res) => {
        let rs = { "status": 1 }
        rs.others = await get_others(req.body.uid)
        res.json(rs)
    },

    get_users_api : async (req, res) => {
        let rs = { "status": 1 }
        rs.users = await get_users()
        res.json(rs)
    },

    get_user_by_id : async (id) => {
        let rs = await db.query('SELECT * FROM users WHERE id = $1', [id])
        // console.log(" **** get_user_by_id", rs)
        if (1==rs.payload.length) {
            let user = rs.payload[0]
            user.status = 1
            return user
        }
        rs.status = 0
        return rs
    },

    get_user_by_email : async (email) => {
        let rs = await db.query('SELECT * FROM users WHERE email = $1', [email])
        // console.log(" **** get_user_by_email", rs)
        if (1==rs.payload.length) {
            let user = rs.payload[0]
            user.status = 1
            return user
        }
        rs.status = 0
        return rs
    },

    // Weird... doesn't fail when the user id doesn't exist. Investigate later. 7/4/20
    delete_user : async (id) => {
        // console.log(`>>>>> delete_user(...) called!`, id)
        let rs = await db.query('DELETE FROM users WHERE id = $1', [id])
        return rs
    },
}
