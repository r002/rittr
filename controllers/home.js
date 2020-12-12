/*
========
./controllers/home.js
========
*/

// const Edict = require('../models/edict')
// const edictService = require('../services/edict-service')

const VERSION = process.env.VERSION
const fs = require('fs')

module.exports = {

    createAccount : (pool, req, res) => {
        res.render('pages/create', {"VERSION": VERSION});
    },

    showLogin : (pool, req, res) => {
        res.render('pages/login', {"VERSION": VERSION});
    },

    showLoginOld : (pool, req, res) => {
        // res.render('pages/landing', {"rs": 123});
        let msg = "Login page for 'Create Account' and 'Login' forms."
        res.render('pages/loginOld', {"rs": 123});
    },

    showHome : async (pool, req, res) => {
        // res.render('pages/home', req)
        // console.log(">>> req.params.uid", req.params.uid)
        let v = {
            VERSION: VERSION,
            UID: req.params.uid
        }
        res.render('pages/home', v)
    },

    serve : async (dir, req, res) => {

        // console.log(">> req asset param:", req.params.asset)
        
        let file = `${dir}/img/${req.params.asset}`
        // console.log(">> file:", file)
        
        let s = fs.createReadStream(file)

        s.on('open', function () {
            res.set('Content-Type', 'image/png')
            s.pipe(res)
        })

        s.on('error', function () {
            // res.set('Content-Type', 'text/plain')
            // res.status(404).end('Not found')
            file = "https://r002.github.io/ctwc/img/player/alex.png"
            res.redirect(file)
        })
    },

    showDash : async (pool, req, res) => {
        // let e1 = new Edict(1, "otp123", "law 1"); e1.id = 10;
        // let e2 = new Edict(1, "otp123", "law 2"); e2.id = 12;
        // let e3 = new Edict(1, "otp123", "law 3"); e3.id = 13;
        // req.edicts = [e1, e2, e3]
        // req.edicts = await edictService.get_edicts(req.query.id)
        res.render('pages/dash', req)
    },

    showAdmin : async (pool, req, res) => {
        let v = {
            VERSION: VERSION,
            UID: req.params.uid
        }
        res.render('pages/admin', v)
    },

    showTimes : (pool, req, res) => {
        let result = ''
        const times = process.env.TIMES || 15
        for (i = 0; i < times; i++) {
            result += i + ' '
        }
        console.log(`Return: ${result} | ${req.query.id}`)
        res.send(result)
    }
}
