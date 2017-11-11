const { toSqlNames } = require('./toSqlName')

function toSqlVal (val) {
  return typeof val === 'string' ? ('\'' + val + '\'') : val
}

function toSqlRow (row) {
  return row.map(val => toSqlVal(val))
}

function toSqlTbl (dbType, tbl) {
  tbl.cols = toSqlNames(dbType, tbl.cols)
  tbl.rows = tbl.rows.map(row => toSqlRow(row))
  return tbl
}

module.exports = toSqlTbl
