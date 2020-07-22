/*
./models/edict.js
========
*/

module.exports = class Edict {
    constructor(user_id, otp, law)
    {
        this.id = null
        this.user_id = user_id
        this.otp =  otp
        this.otp_id =  null
        this.law = law
        this.created_on = null
    }
}
