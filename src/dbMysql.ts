import { Sequelize, QueryTypes } from 'sequelize'
import path from 'path'

require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
})

const dbName = process.env.DB_NAME_MYSQL as string
const dbUser = process.env.DB_USER_MYSQL as string
const dbHost = process.env.DB_HOST_MYSQL
const dbDriver = process.env.DB_DRIVER_MYSQL 
const dbPassword = process.env.DB_PASSWORD_MYSQL




const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    logging: false,
        dialectOptions: {
        options: {
            trustedconnection: false,
            encrypt: false,
            trustServerCertificate: false,
            enableArithAbort: false,
        }
    }
});
sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully MYSQL.');
}).catch((error: any) => {
   console.log('Unable to connect to the database MYSQL: ', error);
});
module.exports = sequelize;