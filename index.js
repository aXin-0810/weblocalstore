var indexedDB = require('./storage/indexedDB');
var webSql = require('./storage/webSql');
var cookie = require('./storage/cookie');

module.exports = {
    indexedDB,
    webSql,
    cookie,
};