const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const events = require('events');
const mongoClient = require('mongodb');
const Koa = require('koa');
const router = require('koa-router');

const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  console.log(1122);
  ctx.res.type = 'text/html';
  ctx.body = '<h1>hello world</h1>';
});

app.use(async (ctx, next) => {
  await next();
  console.log(3344);
})

app.use(async (ctx, next) => {
  console.log(5566);
})

app.listen(3000);

