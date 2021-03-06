const http = require('http');
const child_process = require('child_process');
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
  console.log('提交时间：', event.payload.head_commit.timestamp);
  // 保证是main分支的push行为才会去更新代码
  if (event.payload && event.payload.ref === 'refs/heads/main') {
    console.log('提交信息：', event.payload.head_commit.message);
    child_process.exec('git pull && yarn')
  }
});

