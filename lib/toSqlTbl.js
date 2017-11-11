function toSqlVal (val) {
  return typeof val === 'string' ? ("'" + val + "'") : val
}
function toSqlRow (row) {
  return row.map(val => toSqlVal(val))
}

function toSqlTbl (tblDef) {
  tblDef.rows = tblDef.rows.map(row => toSqlRow(row))
  return tblDef
}

module.exports = toSqlTbl
