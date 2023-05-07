const sql = require('mssql');
const dbConfig = require("../config/dbconfig.js");
const config = {
    user: dbConfig.MSSQL.USER,
    password: dbConfig.MSSQL.PASSWORD,
    server: dbConfig.MSSQL.SERVER,
    database: dbConfig.MSSQL.DATABASE,
    options: {
        encrypt: true, 
        trustServerCertificate: true 
    },  
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool =>{
        console.log("Connected to MSSQL");
        return pool;
    })
    .catch(err => {
        console.log("Database Connection Failed! Bad Config: ", err)
    })



module.exports = {
    poolPromise
}