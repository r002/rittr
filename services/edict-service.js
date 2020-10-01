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
    let query = 'INSERT INTO edicts (user_id, otp_id, content, category_id, medium_id, ref) ' +
                'VALUES ($1, $2, $3, $4, $5, $6) ' +
                'RETURNING *'
    let db_rs = await db.query(query, [edict.user_id, edict.otp_id, edict.content.trim(), 
                                       edict.category_id, edict.medium_id, edict.ref])
    console.log("%%% promulgate db_rs", db_rs)
    rs.status = db_rs.status
    rs.edict_id = db_rs.payload[0].id
    rs.created_on = db_rs.payload[0].created_on
    return rs
}

get_edicts = async (user_id) => {
    // console.log("%%% get_edicts params:", user_id)
    let rs = await db.query('SELECT e.id, e.user_id, u.name, u.sovereignty, u.avatar, e.content, ' +
                            'ec.category, em.medium, e.ref, e.created_on FROM edicts AS e ' +
                            'INNER JOIN users AS u ON e.user_id=u.id ' +
                            'INNER JOIN edict_categories AS ec ON e.category_id=ec.id ' +
                            'INNER JOIN edict_mediums AS em ON e.medium_id=em.id ' +
                            'WHERE user_id = $1 ' +
                            'ORDER BY created_on DESC ' +
                            'LIMIT 10', [user_id])
    // console.log("%%% get_edicts rs", rs)
    return rs.payload
}

get_edictstream = async (user_id) => {
    let rs = await db.query('SELECT e.id, e.user_id, u.name, u.sovereignty, u.avatar, e.content, ' +
                            'ec.category, em.medium, e.ref, e.created_on FROM edicts AS e ' +
                            'INNER JOIN users AS u ON e.user_id=u.id ' +
                            'INNER JOIN edict_categories AS ec ON e.category_id=ec.id ' +
                            'INNER JOIN edict_mediums AS em ON e.medium_id=em.id ' +
                            'WHERE user_id IN (SELECT a.alpha_id FROM alphas AS a WHERE a.user_id=$1) ' +
                            'ORDER BY e.created_on DESC', [user_id])
    return rs.payload
}

module.exports = {
    // get_edicts,
    promulgate_api : async (req, res) => {
        rs = await promulgate(req.body)
        res.json(rs)
    },

    get_edictstream_api : async (req, res) => {
        // console.log("@@@ get_edictstream_api req.body:", req.body)
        let rs = { "status": 1 }
        rs.edictstream = await get_edictstream(req.body.uid)
        res.json(rs)
    },

    get_edicts_api : async (req, res) => {
        // console.log("@@@ get_edicts_api req.body:", req.body)
        let rs = { "status": 1 }
        rs.edicts = await get_edicts(req.body.uid)
        res.json(rs)
    }
}
