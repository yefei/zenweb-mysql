import { PoolOptions, createPool } from 'mysql2';
import { PoolQuery } from 'mysql-easy-query';
import { SetupFunction } from '@zenweb/core';

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

export default function setup(option?: MySQLOption): SetupFunction {
  option = Object.assign({}, defaultOption, option);
  return function mysql(setup) {
    setup.debug('option: %o', option);
    const pool = createPool(option);
    const query = new PoolQuery(pool);
    setup.defineCoreProperty('mysql', { value: query });
    setup.defineContextProperty('db', { value: query });
  }
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
