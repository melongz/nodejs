const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// const testPath = path.join(__dirname, '/source/test');
// async function mkdirTest (dirPath, fileName, content) {
//   await fs.mkdir(dirPath, { recursive: true, }, err => null);
//   await fs.writeFile(dirPath + '/' + fileName, content, err => null);
//   return Promise.resolve(dirPath + '/' + fileName);
// }
// mkdirTest(testPath, 'test2.js', 'console.log(666);')
//   .then(res => {
//     fs.appendFile(res, 'console.log(555777);', err => null )
//   })
const filePath = path.join(__dirname, '/source/log.txt');
const readerStream = fs.createReadStream(filePath, {encoding: 'UTF8'});
let count = 0;
readerStream.on('data', chunk => {
  console.log(chunk);
  count += 1;
})
readerStream.on('end', res => console.log(12345, res, count))


http
  .createServer(((req, res) => {
    const reqUrl = req.url;
    if (reqUrl === '/favicon.ico') {
      res.writeHead(200);
      res.end();
      return;
    }
    const {name, age} = url.parse(reqUrl, true).query;
    res.writeHead(200,
      {
        'Content-Type': 'text/html;charset=UTF-8',
      }
    )
    res.write(`<div>姓名：${name}<br>年龄：${age}</div>`);
    res.end();
  }))
  .listen(3000);
