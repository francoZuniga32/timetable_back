const Sequelize = require('sequelize');
const SqliteDialect = require('@sequelize/sqlite3');
const path = require("path");


const dbPath = path.join(__dirname, 'database.sqlite');
const sequelize = new Sequelize({
    "storage": dbPath,
    "dialect": "sqlite"
});

module.exports = sequelize;