// Imports the Sequelize library/ changed s to S to connect to line 12.
const Sequelize = require('sequelize');
const mysql = require('mysql');

// envirnment variables from .env file is loaded
require('dotenv').config();

let sequelize; 

// For Heroku deployment this checks if JAWSDB_URL environment exists
if (process.env.JAWSDB_URL) {
    // A Sequelize instance is created using JAWSDB_URL environment
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // local database configuration
    sequelize = new Sequelize(
        
        process.env.DB_NAME,           // Database name
        process.env.DB_USER,           // Database username
        process.env.DB_PASSWORD,       // Database password
        {
            host: 'localhost',                // Database host
            dialect: 'mysql',             // Database dialect (MySQL)
            port: 3306 ,            // Database port number
        })
};

class Database {
    constructor(config) {
        this.connection = mysql.createConnection( process.env.JAWSDB_URL ? process.env.JAWSDB_URL : config );
    }

    query(sql, args=[]) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (error, rows) => {
                if (error) {
                    return reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end( error => {
                if (error) {
                    return reject(error);
                } else {
                    resolve();
                }
            } );
        } );
    }
};

const createConnection = (dbName, dbPassword) => {
    const db = new Database({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: dbName
    })
    return db;
};
module.exports = createConnection;

// The created Sequelize instance is exported
module.exports = sequelize; 
