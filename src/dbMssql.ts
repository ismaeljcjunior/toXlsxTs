import { Sequelize, QueryTypes } from 'sequelize'
import path from 'path'

require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
})


const dbName = process.env.DB_BASE_MSSQL as string
const dbUser = process.env.DB_USERNAME_MSSQL as string
const dbHost = process.env.DB_HOST_MSSQL
const dbDriver = process.env.DB_DRIVER_MSSQL 
const dbPassword = process.env.DB_PASSWORD_MSSQL


const dbMssql = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mssql',
    logging: false,
    dialectOptions: {
        options: {
            trustedconnection: false,
            encrypt: false,
            trustServerCertificate: false,
            enableArithAbort: false,
        }
    }
})
dbMssql.authenticate().then(() => {
    console.log('Connection has been established successfully MSSQL.');
}).catch((error: any) => {
    console.log('Unable to connect to the database MSSQL: ', error);
});

export { dbMssql, QueryTypes }