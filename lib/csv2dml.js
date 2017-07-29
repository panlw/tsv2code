const fs = require('fs');
const Promise = require('bluebird');

// http://csv.adaltas.com/parse/
const csvParseOpts = { delimiter: "\t" };
const loadTableData = require('./loadTableData');

const csvLoad = function (files) {
  return Promise.all(files.map(f => loadTableData(f, csvParseOpts)));
}

const csv2dml = function (csvTblDataFiles, dmlFile) {
  const dots = require('./dots');
  csvLoad(csvTblDataFiles)
    .then(tbls => {
      fs.writeFileSync(dmlFile, '');
      tbls.forEach(tbl => fs.appendFileSync(dmlFile, dots.dml(tbl)));
    });
}

module.exports = csv2dml;
