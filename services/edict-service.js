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
        let db_rs = await db.query(query, [edict.user_id, auth_rs.otp_id, edict.law])
        // console.log("%%% db_rs", db_rs)
        rs.status = db_rs.status
    } else {
        // console.log("***** auth failed!")
        rs.errMsg  = c.ERR_E02_INVAL_AUTH
    }
    return rs
}

module.exports = {

    promulgate_api : async (req, res) => {
        let edict = req.body
        rs = await promulgate(edict)
        res.set('Content-Type', 'application/json; charset=UTF-8')
        res.send(JSON.stringify(rs))
    }

}
