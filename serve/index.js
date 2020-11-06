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
const STATIC_PATH = '../static';

routers
  .post('/api/userInfo', async (ctx, next) => {
    ctx.body = ctx.request.body;
  })

app.use(static(path.join(__dirname, STATIC_PATH)));

app.use(bodyparser());

app.use(routers.routes());

app.use(routers.allowedMethods());

app.on('error', err => {
  console.log('出错了: ', err);
});

app.listen(80, () => {
  console.log('Koa is listening in http://localhost:80')
});

