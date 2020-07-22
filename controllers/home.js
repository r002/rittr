/*
========
./controllers/home.js
========
*/

module.exports = {

    showLogin : (pool, req, res) => {
          // res.render('pages/landing', {"rs": 123});
          let msg = "Login page for 'Create Account' and 'Login' forms."
          res.render('pages/login', {"rs": 123});
    },

    showDash : (pool, req, res) => {
          res.render('pages/dash', {"req": req})
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
