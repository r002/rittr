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

express()
  .use(express.static(path.join(__dirname, 'public')))
  // .use((req, res, next) => {
  //     res.header('Access-Control-Allow-Origin', '*');
  //     next(); })
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))
  .get('/', (req, res) => res.send(home.showHome()))
  .get('/db', async (req, res) => {
      try {
          console.log(`*****Connecting to psql!`)
          // console.log(`*****Connecting: ${process.env.DATABASE_URL}`)
          const client = await pool.connect();
          const result = await client.query('SELECT * FROM users');
          const results = { 'results': (result) ? result.rows : null};
          res.render('pages/db', results );
          client.release();
      } catch (err) {
          console.error(err);
          res.send("***Error " + err);
      }
    })
  .get('/times', (req, res) => res.send(home.showTimes(req)))
  .get('/events', (req, res) => publisher.launchSSE(req, res))
  .get('/sub', (req, res) => res.render('pages/sub'))
  .get('/unsub', (req, res) => publisher.unsub(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
