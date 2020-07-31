const express = require('express')
const path = require('path')
const PORT = process.env.PORT  // || 5000
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: eval(process.env.DB_SSL) ? { rejectUnauthorized: false } : false
    // Hack-- disable psql SSL on my localmachine
    // for now. Add self-signed cert later. 6/29/20
    // https://stackoverflow.com/questions/54302088/how-to-fix-error-the-server-does-not-support-ssl-connections-when-trying-to-a
})

const home = require('./controllers/home')
const publisher = require('./controllers/publisher')
const users = require('./controllers/users')
const authService = require('./services/auth-service')
const userService = require('./services/user-service')
const edictService = require('./services/edict-service')
const c = require('./models/constants')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  // .use((req, res, next) => {
  //     res.header('Access-Control-Allow-Origin', '*');
  //     next(); })
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  // Open to everyone:
  .get('/login', (req, res) => route(pool, req, res, home.showLogin))

  // Requires authentication:
  .get('/', (req, res) => route_auth(pool, req, res, home.showDash))
  .get('/admin/users', (req, res) => route_auth(pool, req, res, users.view))
  .get('/times', (req, res) => route_auth(pool, req, res, home.showTimes))
  // .get('/events', (req, res) => publisher.launchSSE(req, res))
  // .get('/sub', (req, res) => res.render('pages/sub'))
  // .get('/unsub', (req, res) => publisher.unsub(req, res))

  // JSON REST API POST:
  .post('/v1/otp_token', (req, res) => route_api(req, res, authService.email_otp_api))
  .post('/v1/user', (req, res) => route_api(req, res, userService.create_user_api))

  // Authenticated REST API POST:
  .post('/v1/user/:uid/edict', (req, res) => route_auth_api(req, res, edictService.promulgate_api))
  .post('/v1/user/:uid/alpha', (req, res) => route_auth_api(req, res, userService.create_alpha_api))

  // JSON REST API GET:
  .get('/v1/user/:uid/edicts', (req, res) => route_auth_api(req, res, edictService.get_edicts_api))
  .get('/v1/user/:uid/alphas', (req, res) => route_auth_api(req, res, userService.get_alphas_api))
  .get('/v1/user/:uid/others', (req, res) => route_auth_api(req, res, userService.get_others_api))
  .get('/v1/user/:uid/edictstream', (req, res) => route_auth_api(req, res, edictService.get_edictstream_api))

  // Currently unused by GUI:
  .get('/v1/users', (req, res) => route_auth_api(req, res, userService.get_users_api))

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


route = (pool, req, res, fxn) => {
      console.log("route called: ", fxn)
      fxn(pool, req, res)
}

route_auth = async (pool, req, res, fxn) => {
    console.log("route_auth called: ", fxn)
    console.log("Check authentication cookie...", req.query.id, req.query.otp)
    let auth_rs = await authService.check_auth(req.query.id, req.query.otp)
    console.log(auth_rs)
    if (1==auth_rs.status) {
        fxn(pool, req, res)
    } else {
        // Authentication failed; forward to login view.
        route(pool, req, res, home.showLogin)
    }
}

route_api = (req, res, fxn) => {
    console.log("API called:", req.params, req.query, fxn)
    fxn(req, res)
}

route_auth_api = async (req, res, fxn) => {
    console.log("Auth API called:", req.params, req.query, req.body, fxn)

    let user_id = req.query.uid || req.params.uid
    let otp = req.query.otp || req.params.otp || req.body.otp
    auth_rs = await authService.check_auth(user_id, otp)
    if (1==auth_rs.status) {
        req.body.uid = user_id            // Hydrate the req's uid field.
        req.body.otp_id = auth_rs.otp_id  // Hydrate the req's otp_id field.
        fxn(req, res)
    } else {
        rs = {
            "status": 0,
            "errMsg": c.ERR_E02_INVAL_AUTH
        }
        res.status(401).json(rs)  // 401-Unauthenticated; 403-Unauthorized.
    }
}
