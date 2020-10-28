const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mongoClient = require('mongodb');
const {databaseUrl} = require('./config/config');
const extData = fs.readFileSync('./config/ext.json');
const EXT_MAP = JSON.parse(extData.toString());
const mockData = {
  status: 200,
  data: {
    name: 'melongz',
    age: 27,
  },
  message: '请求成功'
}

mongoClient.connect(databaseUrl, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  const dbTest = db.db('test');
  const collMovie = dbTest.collection('userInfo');
  collMovie.find({}).toArray((err, result) => {
    console.log(result);
  })
  db.close();
});

function handleNoFile (res) {
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

function handleFavicon (res) {
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
}

function handleApi (req, res) {
  const method = req.method;
  const { query, } = url.parse(req.url, true);
  let reqParams = '';
  res.setHeader('Content-Type', 'application/json');
  const handleMethod = {
    'OPTIONS': function () {
      res.statusCode = 200;
    },
    'GET': function () {
      res.statusCode = 200;
      res.write(JSON.stringify(mockData));
    },
    'POST': function () {
      req.on('data', chunk => {
        console.log(222, chunk);
        reqParams += chunk;
      })
      req.on('end', () => {

      })
      res.statusCode = 200;
      res.write(JSON.stringify(mockData));
    }
  }
  handleMethod[method]();
  res.end();
}

function handleHtml (res, pathname) {
  fs.readFile(`./web/pages${pathname}`, (err, fileData) => {
    if (err) {
      handleNoFile(res);
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', getContentType(pathname));
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
    const urlInfo = url.parse(reqUrl, true);
    const pathname = urlInfo.pathname;
    const isApi = reqUrl.slice(0, 4) === '/api';
    const isFavicon = pathname.includes('/favicon.ico');
    if (isFavicon) {
      handleFavicon(res);
      return;
    }
    if (isApi) {
      handleApi(req, res);
      return;
    }
    handleHtml(res, pathname);
  }))
  .listen(3000);
