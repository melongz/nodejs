const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const rule = require('./src/rule');

http
  .createServer(function (req, res) {
    const {pathname, query} = url.parse(req.url)
    if (pathname === '/favicon.ico') {
      res.writeHead(200);
      res.end();
      return;
    }
    if (pathname === '/') {
      res.writeHead(200);
      fs.createReadStream(__dirname + '/source/index.html')
        .pipe(res);
    }
    if (pathname === '/game') {
      res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
      const key = querystring.parse(query).id;
      const result = rule(key);
      res.end(JSON.stringify(result));
    }
  })
  .listen(3000);
