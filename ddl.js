(async function () {
  const tsv2ddl = require('./lib/tsv2ddl')
  await tsv2ddl('mysql', './in/def-mysql.tsv', './in/ddl.tsv', './out/ddl.sql')
})()
