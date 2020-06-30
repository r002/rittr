const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: eval(process.env.DB_SSL) ? { rejectUnauthorized: false } : false
    // Hack-- disable psql SSL on my localmachine
    // for now. Add self-signed cert later. 6/29/20
    // https://stackoverflow.com/questions/54302088/how-to-fix-error-the-server-does-not-support-ssl-connections-when-trying-to-a
});

var home = require('./controllers/home');
var publisher = require('./controllers/publisher');
var users = require('./controllers/users');

express()
  .use(express.static(path.join(__dirname, 'public')))
  // .use((req, res, next) => {
  //     res.header('Access-Control-Allow-Origin', '*');
  //     next(); })
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.send(home.showHome()))
  .get('/admin/users', (req, res) => users.view(pool, req, res))
  .get('/times', (req, res) => res.send(home.showTimes(req)))
  // .get('/events', (req, res) => publisher.launchSSE(req, res))
  // .get('/sub', (req, res) => res.render('pages/sub'))
  // .get('/unsub', (req, res) => publisher.unsub(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
