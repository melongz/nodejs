const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const extData = fs.readFileSync('./config/ext.json');
const EXT_MAP = JSON.parse(extData.toString());

function noFileSlove (res) {
  fs.readFile('./web/pages/404/index.html', (err, fileData) => {
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200, {'Content-type': 'text/html;charset=UTF-8',});
      res.write(fileData);
      res.end();
    }
  })
}

function getHeader (pathname) {
  const extname = path.extname(pathname);
  const MAP = {
    '.html': 'text/html;charset=UTF-8',
    '.css': 'text/css;charset=UTF-8',
    '.js': 'text/js;charset=UTF-8',
  }
  return {
    'Content-type': `${EXT_MAP[extname] || 'text/html'};charset=UTF-8`,
  };
}

http
  .createServer(((req, res) => {
    const reqUrl = req.url;
    if (reqUrl.includes('/favicon.ico')) {
      fs.readFile('./web/favicon.ico', (err, fileData) => {
        if (err) {
          res.writeHead(404);
          res.end();
        } else {
          res.writeHead(200);
          res.write(fileData);
          res.end();
        }
      })
      return;
    }
    const { query: {name, age}, pathname, } = url.parse(reqUrl, true);
    fs.readFile(`./web/pages${pathname}`, (err, fileData) => {
      if (err) {
        noFileSlove(res);
      } else {
        res.writeHead(200, getHeader(pathname));
        res.write(fileData);
        res.end();
      }
    })
  }))
  .listen(3000);
