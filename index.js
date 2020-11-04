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
const router = new Router();

router.get('/', async (ctx, next) => {
  await next();
  ctx.body = fs.readFileSync('./web/pages/home/index.html', 'utf8');
})

// app.use(static(__dirname, '/static'));

app.use(bodyparser());

app.use(router.routes());

app.listen(3000, () => {
  console.log('Koa is listening in http://localhost:3000')
});

