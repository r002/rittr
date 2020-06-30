// publisher.js
// ========

var subs = new Set();
module.exports.subs = subs;

module.exports = {
    unsub: function (req, res) {
        var client_id = req.query.id;
        subs.delete(client_id);
        let result = `client_id unsubbed: ${client_id}`;
        console.log(result);
        res.send(result)
    },

    launchSSE: async function (req, res) {
        // A new client_id has subscribed to our SSE stream.
        // Keep track of all clients who have subscribed to us.
        var client_id = req.query.id;
        subs.add(client_id);
        let result = `client_id subbed: ${client_id}`;
        console.log(result);

        // Send the header to prepare the browser for EventSource streaming
        res.set({
           'Cache-Control': 'no-cache',
           'Content-Type': 'text/event-stream',
           'Connection': 'keep-alive'
        });
        res.flushHeaders();

        let count = 0;
        while (subs.has(client_id))
        {
            await new Promise(resolve => setTimeout(resolve, 1000));  // Sleep for one second
            console.log(`Emit to ${client_id}`, ++count);
            res.write(`data: ${count}\n\n`);  // Emit an SSE that contains the current 'count' as a string
        }
    }
};
