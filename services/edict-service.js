/*
./services/edict-service.js
Responsible for all EdictService methods:
- promulgate(..)
- promulgate_api(..)
========
*/

const db = require('../services/db')
const c = require('../models/constants')
const authService = require('../services/auth-service')

promulgate = async (edict) => {
    let rs = { "status": 0 }
    auth_rs = await authService.check_auth(edict.user_id, edict.otp)
    // console.log("%%% auth_rs", auth_rs)

    if (1==auth_rs.status) {
        let query = 'INSERT INTO edicts (user_id, otp_id, law) VALUES ($1, $2, $3) ' +
                    'RETURNING *'
        let db_rs = await db.query(query, [edict.user_id, auth_rs.otp_id, edict.law.trim()])
        // console.log("%%% db_rs", db_rs)
        rs.status = db_rs.status
    } else {
        // console.log("***** auth failed!")
        rs.errMsg  = c.ERR_E02_INVAL_AUTH
    }
    return rs
}

get_edicts = async (user_id) => {
    let rs = await db.query('SELECT * FROM edicts WHERE user_id = $1', [user_id])
    return rs.payload
}

module.exports = {
    // get_edicts,
    promulgate_api : async (req, res) => {
        let edict = req.body
        rs = await promulgate(edict)
        res.set('Content-Type', 'application/json; charset=UTF-8')
        res.send(JSON.stringify(rs))
    },

    get_edicts_api : async (req, res) => {
        // console.log("### req:", req.params, req.query)
        auth_rs = await authService.check_auth(req.params.id, req.query.otp)  // user_id, otp
        let rs = { "status": 0 }
        if (1==auth_rs.status) {
            rs.status = 1
            rs.edicts = await get_edicts(req.params.id)
        } else {
            rs.errMsg  = c.ERR_E02_INVAL_AUTH
        }

        // Old way:
        // res.set('Content-Type', 'application/json; charset=UTF-8')
        // res.send(JSON.stringify(rs))

        // New way:
        // http://expressjs.com/en/api.html#res.json - Just learned this! 7/25/20
        res.json(rs)
    }

}
