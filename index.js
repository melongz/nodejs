const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const events = require('events');
const mongoClient = require('mongodb');
const Koa = require('koa');
const Router = require('koa-router'); // 路由
const static = require('koa-static'); // 加载静态资源
const bodyparser = require('koa-bodyparser'); // 解析post请求参数

const app = new Koa();
const routers = new Router();

routers
  .get('/', async (ctx, next) => {
    ctx.body = fs.readFileSync('./static/index.html', 'utf8');
  })
  .post('/api/personInfo', async (ctx, next) => {
    ctx.body = ctx.request.body;
  })

app.use(async (ctx, next) => {
  const start = new Date().getTime();
  console.log('开始请求');
  await next();
  const time = new Date().getTime() - start;
  console.log('请求花费时间：', ctx.url,  time);
});


app.use(async (ctx, next) => {
  console.log(2);
  await next();
  console.log(3);
})

app.use(async (ctx, next) => {
  console.log(4);
  await next();
  console.log(5);
})

app.use(bodyparser());

app.use(static(path.join(__dirname, '/static')));

app.use(() => console.log(1111))

app.use(routers.routes());

app.use(routers.allowedMethods());

app.on('error', err => {
  console.log('error: ', err);
});

app.listen(3000, () => {
  console.log('Koa is listening in http://localhost:3000')
});

