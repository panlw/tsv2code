const fs = require('fs')
const dots = require('./dots')
const loadAliases = require('./loadAliases')
const loadTableDefs = require('./loadTableDefs')
const { toSqlName } = require('./toSqlName')

const toSqlDefault = function (dval) {
  return dval ? (dval === 'ID' ? 'AUTO_INCREMENT' : ('DEFAULT ' + dval)) : 'not null'
}

const toSqlColDefs = function (dbType, cols, aliases) {
  return cols.map(col => {
    var sqlCol = {}
    sqlCol.name = toSqlName(dbType, col.name)
    sqlCol.desc = col.desc
    const alias = aliases[col.type]
    if (alias) {
      sqlCol.type = alias.type
      sqlCol.size = col.size || alias.size
      sqlCol.dval = col.dval || alias.dval
    } else {
      sqlCol.type = col.type
      sqlCol.size = col.size
      sqlCol.dval = col.dval
    }
    sqlCol.dval = toSqlDefault(sqlCol.dval)
    return sqlCol
  })
}

const tsv2ddl = async function (dbType, aliasesFile, tblDefFile, ddlFile) {
  const aliases = await loadAliases(aliasesFile)
  const tblDefs = await loadTableDefs(tblDefFile)
  fs.writeFileSync(ddlFile, '')
  tblDefs.forEach(def => {
    def.type = dbType
    def.cols = toSqlColDefs(dbType, def.cols, aliases)
    fs.appendFileSync(ddlFile, dots.tbl(def))
  })
}

module.exports = tsv2ddl
