const fs = require('fs')
const dots = require('./dots')
const loadTableData = require('./loadTableData')
const { toSqlNames } = require('./toSqlName')

const tsv2dml = async function (dbType, tblDataFile, dmlFile) {
  const tbl = await loadTableData(tblDataFile)
  tbl.cols = toSqlNames(dbType, tbl.cols)
  fs.writeFileSync(dmlFile, '')
  fs.appendFileSync(dmlFile, dots.dml(tbl))
}

module.exports = tsv2dml
