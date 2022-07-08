const sql = require('mssql')
require('dotenv').config()
const config = {
    user: 'hement',
    password: 'Celebal@12345',
    server: 'hement.database.windows.net', 
    database: 'hemdblearning',
    port: 1433 
};
//Database connection
function dbConnection() {                         // Connecting to Ms Sql database
    return new Promise((resolve, reject) => {
        try {
            sql.connect(config, err => {
                if (err) {
                    console.log(err.stack);
                    
                    reject('Failed to open a SQL Database connection.', err.stack);
                }
                resolve("SQL connected")
            })
        } catch (err) {
            reject('Failed to connect to a SQL Database connection.', err.message);
        }

    })

}
module.exports = dbConnection