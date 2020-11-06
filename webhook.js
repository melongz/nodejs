const http = require('http');
const spawn = require('child_process').spawn;
const createHandler = require('github-webhook-handler');

const handler = createHandler({ path: '/webhook', secret: 'zml@12345' });

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  })
}).listen(8080);

handler.on('error', function (err) {
  console.error('Error:', err.message)
});

handler.on('push', function (event) {
  spawn('sh', ['./deploy.sh']);
});
