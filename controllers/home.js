// home.js
// ========

module.exports = {
    showHome: function() {
          return "Landing homepage for rittr!"
    },

    showTimes: function(req) {
        let result = '';
        const times = process.env.TIMES || 15;
        for (i = 0; i < times; i++) {
            result += i + ' ';
        }
        console.log(`Return: ${result} | ${req.query.id}`)
        return result;
    }
}
