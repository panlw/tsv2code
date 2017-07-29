const fs = require('fs');
const csv = require('csv');
const Promise = require('bluebird');

const demoTblData = function () {
  return {
    file: 'S_DEMO.csv',
    name: 'S_DEMO',
    ctgs: ['','','N',''],
    cols: "'col1','col2','col3','col4'",
    rows: [
      "'H','001',1,'1'",
      "'E','001',2,'1'",
      "'L','002',3,'0'",
    ],
  };
};

const loadTableData = function (file, opts) {
  // if (1) return Promise.resolve(demoTblData());
  return new Promise((resolve, reject) => {
    var tblData;
    fs.createReadStream(file)
      .on('close', () => resolve(tblData))
      .on('error', reject)
      .pipe(csv.parse(opts))
      .pipe(csv.transform(line => {
        if (!tblData) { // line 1 -> col range, table name
          const col0 = line.findIndex(val => !!val);
          tblData = { file, name: line[col0], col0, rows: [] };
          tblData.col1 = line.indexOf(tblData.name, tblData.col0 + 1);
          if (tblData.col0 === -1 || tblData.col1 === -1) {
            throw new Error(`[DML] the first line is invalid: [${col0}, ${tblData.col1}]`);
          }
        } else if (!tblData.ctgs) { // line 2 -> empty is string
          tblData.ctgs = line.slice(tblData.col0, tblData.col1 + 1);
        } else if (!tblData.cols) { // line 3 -> col names
          tblData.cols = line.slice(tblData.col0, tblData.col1 + 1).join(',');
        } else { // data rows
          if (!line[tblData.col0]) return; // empty line
          const row = line.slice(tblData.col0, tblData.col1 + 1)
            .map((val, idx) => !tblData.ctgs[idx] ? /* val is a string ? */ `'${val}'` : val);
          tblData.rows.push(row);
        }
      }));
  });
};

module.exports = loadTableData;
