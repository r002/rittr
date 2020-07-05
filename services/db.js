const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: eval(process.env.DB_SSL) ? { rejectUnauthorized: false } : false
    // Hack-- disable psql SSL on my localmachine for now. Add self-signed cert later. 6/29/20
    // https://stackoverflow.com/questions/54302088/how-to-fix-error-the-server-does-not-support-ssl-connections-when-trying-to-a
});

module.exports = {

    // With async/await
    query : async (text, params) => {
        const start = Date.now()
        try {
            const { rows } = await pool.query(text, params)
            const duration = Date.now() - start
            // console.log('### executed query', { text, duration, rows, "rowCount":rows.length })
            return {"payload": rows, "status": 1}  // status=1 if successful; 0 if failure
        } catch (err) {
            // console.error(" %% BOOM! %%", err)
            // throw err
            return {"errObj": err, "status": 0}
        }
    },

  end : () => {
      pool.end();
  },
}
