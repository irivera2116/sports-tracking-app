// Imports the Sequelize library
const sequelize = require('sequelize');

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
            host: '',                // Database host
            dialect: '',             // Database dialect (MySQL)
            port: 3306 ,            // Database port number
        })
};

// The created Sequelize instance is exported
module.exports = sequelize; 
