/**
 * 1. 由 json-server 去抓取此 JSON 資料快速製造 Fake REST API
 * 2. 這裡的 DataBase 資料是暫存在記憶體中
 * 3. 終端機下指令，使用 npm run db-api 跑起來
 */
const data = require('./db.json');

module.exports = () => data;
