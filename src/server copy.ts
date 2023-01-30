import excel from 'exceljs';
import { dbMssql } from './dbMssql';
import { QueryTypes } from 'sequelize';
import fs = require('fs');
import xlsx  from 'xlsx'
import ExcelJS from 'exceljs';


const testJsonToXlsx = async () => {
    const SELECT_BASE = process.env.SELECT_BASE as string
    const headerNames = new Set();
    const workbook = new ExcelJS.Workbook();
    const report = workbook.addWorksheet('My Sheet')

    let rowIndex = 2

    //select
    const resultSQL = await dbMssql.query(SELECT_BASE, { type: QueryTypes.SELECT })
    //deseestruturação das propiedades do objeto
    resultSQL.forEach(obj => { Object.keys(obj).forEach(key => { headerNames.add(key) }) })

   






    console.log(headerNames);







}
testJsonToXlsx()


let workbook = new excel.Workbook();

let sheetName = 'Sheet1';
let sheet = workbook.addWorksheet(sheetName);

sheet.columns = [{ key: "name", header: "name" }, { key: "age", header: "age" }];

let data = [{ name: "Kalai", age: 24 }, { name: "Vignesh", age: 24 }];

for (const i in data) {
    sheet.addRow(data[i]);
}

let fileName = "Sample.xlsx";
workbook.xlsx.writeFile(fileName).then(() => {

});


