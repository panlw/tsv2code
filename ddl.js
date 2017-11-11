(async function () {
  const tsv2ddl = require('./lib/tsv2ddl')
  await tsv2ddl('./in/def-mysql.tsv', './in/ddl.tsv', './out/ddl.sql')
})()
