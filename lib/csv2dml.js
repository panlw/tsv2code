const fs = require('fs')
const dots = require('./dots')
const loadTableData = require('./loadTableData')

const csv2dml = async function (tblDataFile, dmlFile, swarm) {
  const tpl = swarm ? 'dml-swarm' : 'dml'
  const tbl = await loadTableData(tblDataFile)
  fs.writeFileSync(dmlFile, '')
  fs.appendFileSync(dmlFile, dots[tpl](tbl))
}

module.exports = csv2dml
