'use strict';

const debug = require('debug')('zenweb:mysql');
const mysql = require('mysql2');
const { PoolQuery } = require('mysql-easy-query');

/**
 * @param {Object} obj 
 * @param {string[]} keys
 * @returns {Object}
 */
function popProperties(obj, keys) {
  const pop = {};
  keys.forEach(key => {
    if (key in obj) {
      pop[key] = obj[key];
      delete obj[key];
    }
  });
  return pop;
}

/**
 * @param {import('@zenweb/core').Core} core 
 * @param {object} [options]
 */
function setup(core, options) {
  options = Object.assign({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'test',
    charset: 'utf8mb4',
    timezone: '+08:00',
    connectionLimit: 100,
    contextProperty: 'db',
  }, options);
  debug('options: %o', options);
  const otherOptions = popProperties(options, [
    'contextProperty',
  ]);
  const pool = mysql.createPool(options);
  const query = new PoolQuery(pool);
  Object.defineProperty(core, 'mysql', { value: query });
  Object.defineProperty(core.koa.context, otherOptions.contextProperty, { value: query });
}

module.exports = {
  setup,
};
