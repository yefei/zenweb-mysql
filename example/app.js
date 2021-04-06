'use strict';

process.env.DEBUG = '*';

const app = module.exports = require('zenweb').create();
app.setup(require('..').setup, {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'test',
  charset: 'utf8mb4',
  timezone: '+08:00',
  connectionLimit: 100,
});
app.boot().then(() => {
  app.router.get('/', async ctx => {
    ctx.body = await app.mysql.query('SELECT 1+1');
  });
  app.listen();
});
