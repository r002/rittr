// user.js - Model
// ========

module.exports = class User {
    constructor(name, email, sovereignty)
    {
        this.id = null
        this.name = name
        this.email =  email
        this.sovereignty = sovereignty
        this.created_on = null
        this.last_login = null
    }
}
