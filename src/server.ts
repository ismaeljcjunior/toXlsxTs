import { dbMssql } from './dbMssql';
import { QueryTypes } from 'sequelize';
import fs = require('fs');
import * as XLSX from 'xlsx';
import express = require('express');

const app = express();

app.get('/download', async (req, res: express.Response) => {
  let resultSQL
  let resultSQLLength
  const testJsonToXlsx = async () => {
    const SELECT_BASE = process.env.SELECT_BASE as string
    resultSQL = await dbMssql.query(SELECT_BASE, { type: QueryTypes.SELECT })
    resultSQLLength = resultSQL.length
  }
  testJsonToXlsx()

  if (resultSQL === undefined || resultSQL === null) {
    return
  }
  if (resultSQLLength === undefined || resultSQLLength === null) {
    return
  }

  const headers = Object.keys(resultSQL[0]);
  const data = [];

  for (let i = 0; i < resultSQLLength; i++) {
    const row = resultSQL[i];
    const dataRow = [];
    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      const value = row[header];
      dataRow.push(typeof value === 'number' || typeof value === 'object' ? JSON.stringify(value) : value);
    }
    data.push(dataRow);
  }

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  // Configurar o cabeçalho da resposta HTTP para forçar o download
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
  res.send(buffer);
});



app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


