const mysql = require('mysql2');

class Database {
    constructor(config) {
        console.log(process.env.JAWSDB_URL)
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


const connectDB = (dbName, dbPassword) => {
    const db = new Database({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: dbName
    })
    return db;
};

module.exports = connectDB;