import { Core } from '@zenweb/core';
import { setup } from '../src/index';

const app = new Core();

app.setup(setup, {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'test',
  charset: 'utf8mb4',
  timezone: '+08:00',
  connectionLimit: 100,
});

app.use(async (ctx, next) => {
  ctx.body = await ctx.db.query('SELECT 1+1');
});

app.start();
