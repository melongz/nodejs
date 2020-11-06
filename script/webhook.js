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
  // 保证是main分支的push行为才会去更新代码
  console.log('webhook', 123,  new Date());
  if (event.payload && event.payload.ref === 'refs/heads/main') {
    console.log('pull');
    runCommand('sh', ['./deploy.sh'], function( txt ){
      console.log('txt', txt);
    });
  }
});

function runCommand( cmd, args, callback ){
  var child = spawn( cmd, args );
  var resp = 'Deploy OK';
  child.stdout.on('data', function( buffer ){ resp += buffer.toString(); });
  child.stdout.on('end', function(){ callback( resp ) });
}
