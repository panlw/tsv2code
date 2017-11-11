const fs = require('fs')
const dots = require('./lib/dots')
const toSqlTbl = require('./lib/toSqlTbl')

const authTbls = require('./dml_ps/dml_ps_auth')
const itemTbls = require('./dml_ps/dml_ps_item')
const tbls = authTbls.concat(itemTbls)

const dmlFile = './out/dml_ps.sql'
fs.writeFileSync(dmlFile, '')
tbls.forEach(tbl => fs.appendFileSync(dmlFile, dots.dml(toSqlTbl('mysql', tbl))))
