// users.js
// ========

module.exports = {

    view : async (pool, req, res) => {
        try {
            console.log(`## Connecting to psql!!`)
            // console.log(`*****Connecting: ${process.env.DATABASE_URL}`)
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM users');
            const results = { 'results': (result) ? result.rows : null};
            res.render('pages/users', results );
            client.release();
        } catch (err) {
            console.error(err);
            res.send("***Error " + err);
        }
    }
}
