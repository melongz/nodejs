const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const rule = require('./rule');

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
      fs.createReadStream(__dirname + '/index.html')
        .pipe(res);
    }
    if (pathname === '/game') {
      res.writeHead(200);
      const key = querystring.parse(query).id;
      const result = rule(key);
      console.log(result);
      res.end(result);
    }
  })
  .listen(3000);
