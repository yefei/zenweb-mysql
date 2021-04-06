import { PoolQuery } from 'mysql-easy-query';

declare module '@zenweb/core' {
  interface Core {
    mysql: PoolQuery;
  }
}
