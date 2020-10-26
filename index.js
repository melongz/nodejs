const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const extData = fs.readFileSync('./config/ext.json');
const EXT_MAP = JSON.parse(extData.toString());

function noFileSlove (res) {
  fs.readFile('./web/pages/404/index.html', (err, fileData) => {
    if (err) {
      res.statusCode = 404
      res.end();
    } else {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html;charset=UTF-8');
      res.write(fileData);
      res.end();
    }
  })
}

function getContentType (pathname) {
  const extname = path.extname(pathname);
  return `${EXT_MAP[extname] || 'text/html'};charset=UTF-8`;
}

http
  .createServer(((req, res) => {
    const reqUrl = req.url;
    if (reqUrl.includes('/favicon.ico')) {
      fs.readFile('./web/favicon.ico', (err, fileData) => {
        if (err) {
          res.statusCode = 404;
          res.end();
        } else {
          res.statusCode = 200;
          res.write(fileData);
          res.end();
        }
      })
      return;
    }
    const urlInfo = url.parse(reqUrl, true);
    const pathname = urlInfo.pathname === '/' ? '/home/index.html' : urlInfo.pathname;
    fs.readFile(`./web/pages${pathname}`, (err, fileData) => {
      if (err) {
        noFileSlove(res);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', getContentType(pathname));
        res.write(fileData);
        res.end();
      }
    })
  }))
  .listen(3000);
