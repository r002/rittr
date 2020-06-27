const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/times', (req, res) => res.send(showTimes(req)))
  .get('/events', (req, res) => launchSSE(req, res))
  .get('/sub', (req, res) => res.render('pages/sub'))
  .get('/unsub', (req, res) => unsub(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

var subs = new Set();

unsub = (req, res) => {
    var client_id = req.query.id;
    subs.delete(client_id);
    let result = `client_id unsubbed: ${client_id}`;
    console.log(result);
    res.send(result)
}

launchSSE = async(req, res) => {
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

showTimes = (req) => {
    let result = '';
    const times = process.env.TIMES || 15;
    for (i = 0; i < times; i++) {
        result += i + ' ';
    }
    console.log(`Return: ${result} | ${req.query.id}`)
    return result;
}


// async launchSSE = (req, res) => {
//     var client_id = req.query.id;
//     console.log(`Got /events from ${client_id}`);
//     res.set({
//       'Cache-Control': 'no-cache',
//       'Content-Type': 'text/event-stream',
//       'Connection': 'keep-alive'
//     });
//     res.flushHeaders();
//
//     // Tell the client to retry every 10 seconds if connectivity is lost
//     res.write('retry: 10000\n\n');
//     let count = 0;
//
//     while (true) {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//
//       console.log(`Emit to ${client_id}`, ++count);
//       // Emit an SSE that contains the current 'count' as a string
//       res.write(`data: ${count}\n\n`);
//     }
// }
