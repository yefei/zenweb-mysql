import { PoolOptions } from 'mysql2';
import { PoolQuery } from 'mysql-easy-query';

export interface MySQLOptions extends PoolOptions {
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

  /** @default 'db' */
  contextProperty?: string;
}

declare module '@zenweb/core' {
  interface Core {
    mysql: PoolQuery;
  }
}

declare module 'koa' {
  interface BaseContext {
    db: PoolQuery;
  }
}
