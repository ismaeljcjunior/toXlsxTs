import excel from 'exceljs';
import { dbMssql } from './dbMssql';
import { QueryTypes } from 'sequelize';
import fs = require('fs');
import xlsx  from 'xlsx'
import ExcelJS from 'exceljs';


const testJsonToXlsx = async () => {
    const SELECT_BASE = process.env.SELECT_BASE as string
    const resultSQL = await dbMssql.query(SELECT_BASE, { type: QueryTypes.SELECT })




   






    console.log(resultSQL);

}
testJsonToXlsx()





