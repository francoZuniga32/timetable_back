require('dotenv').config();

console.log(process.env);

module.exports = {
    "development": { 
        "storage": "./database.sqlite",
        "dialect": "sqlite"
    },
    "test": {
        "username": process.env.BD_USER,
        "password": process.env.BD_PASSWORD,
        "database": process.env.BD_NAME,
        "host": process.env.BD_HOST,
        "port": process.env.BD_HOST_PORT,
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.BD_USER,
        "password": process.env.BD_PASSWORD,
        "database": process.env.BD_NAME,
        "host": process.env.BD_HOST,
        "dialect": "mysql"
    }
}