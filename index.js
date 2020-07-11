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

var home = require('./controllers/home')
var publisher = require('./controllers/publisher')
var users = require('./controllers/users')
var authService = require('./services/auth-service')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  // .use((req, res, next) => {
  //     res.header('Access-Control-Allow-Origin', '*');
  //     next(); })
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => route(pool, req, res, home.showHome))
  .get('/login', (req, res) => route(pool, req, res, home.showLogin))
  .get('/admin/users', (req, res) => route(pool, req, res, users.view))
  .get('/times', (req, res) => route(pool, req, res, home.showTimes))
  // .get('/events', (req, res) => publisher.launchSSE(req, res))
  // .get('/sub', (req, res) => res.render('pages/sub'))
  // .get('/unsub', (req, res) => publisher.unsub(req, res))

  // JSON REST API
  .post('/v1/otp_token', (req, res) => route_api(req, res, authService.email_otp_api))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


// TODO: Check authentication cookie to validate if user is authorized
//       to access the requested resource.
route = (pool, req, res, fxn) => {
    console.log("Router called: ", fxn)
    console.log("Check authentication cookie...", req.query.id, req.query.otp)
    fxn(pool, req, res)
}

route_api = (req, res, fxn) => {
    console.log("API called: ", fxn)
    fxn(req, res)
}
