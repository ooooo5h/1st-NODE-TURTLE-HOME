const mysql    = require("mysql2/promise");
const dbConfig = require("../config/mysql");

const connection = mysql.createPool(dbConfig);

module.exports = connection;