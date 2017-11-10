const fs = require('fs')
const dots = require('./dots')
const loadAliases = require('./loadAliases')
const loadTableDefs = require('./loadTableDefs')

const toSqlDefault = function (dval) {
  return dval ? (dval === 'ID' ? 'AUTO_INCREMENT' : ('DEFAULT ' + dval)) : 'not null'
}

const toSqlColDefs = function (cols, aliases) {
  return cols.map(col => {
    var sqlCol = {}
    sqlCol.name = col.name
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

const outputDDL = function (aliases, tblDefs, ddlFile) {
  fs.writeFileSync(ddlFile, '')
  for (var i in tblDefs) {
    const def = tblDefs[i]
    def.cols = toSqlColDefs(def.cols, aliases)
    fs.appendFileSync(ddlFile, dots.tbl(def))
  }
}

module.exports = async function (aliasesFile, tblDefFile, ddlFile) {
  const aliases = await loadAliases(aliasesFile)
  const tblDefs = await loadTableDefs(tblDefFile)
  outputDDL(aliases, tblDefs, ddlFile)
}
