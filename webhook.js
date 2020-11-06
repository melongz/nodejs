const http = require('http');
const spawn = require('child_process').spawn;
const createHandler = require('github-webhook-handler');

const handler = createHandler({ path: '/webhook', secret: 'zml@12345' });

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  })
}).listen(6666);

handler.on('error', function (err) {
  console.error('Error:', err.message)
});

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);

  runCommand('sh', ['./deploy.sh'], function( txt ){
    console.log(txt);
  });
});

function runCommand( cmd, args, callback ){
  const child = spawn( cmd, args );
  let resp = 'Deploy OK';
  child.stdout.on('data', function( buffer ){ resp += buffer.toString(); });
  child.stdout.on('end', function(){ callback( resp ) });
}
