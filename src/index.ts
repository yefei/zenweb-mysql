import mysql = require('mysql2');
import { PoolOptions } from 'mysql2';
import { PoolQuery } from 'mysql-easy-query';
import Debug from 'debug';
import { Core } from '@zenweb/core';

const debug = Debug('zenweb:mysql');

export interface MySQLOption extends PoolOptions {
  /** @default 'localhost' */
  host?: string;

  /** @default 3306 */
  port?: number;

  /** @default 'root' */
  user?: string;

  /** @default '' */
  password?: string;

  /** @default 'test' */
  database?: string;

  /** @default 'utf8mb4' */
  charset?: string;

  /** @default '+08:00' */
  timezone?: string;

  /** @default 100 */
  connectionLimit?: number;
}

const defaultOption: MySQLOption = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'test',
  charset: 'utf8mb4',
  timezone: '+08:00',
  connectionLimit: 100,
};

export function setup(core: Core, option?: MySQLOption) {
  option = Object.assign({}, defaultOption, option);
  debug('option: %o', option);
  const pool = mysql.createPool(option);
  const query = new PoolQuery(pool);
  Object.defineProperty(core, 'mysql', { value: query });
  Object.defineProperty(core.koa.context, 'db', { value: query });
}

declare module '@zenweb/core' {
  interface Core {
    mysql: PoolQuery;
  }
}

declare module 'koa' {
  interface DefaultContext {
    db: PoolQuery;
  }
}
