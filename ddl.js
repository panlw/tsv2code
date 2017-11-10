(async function () {
  const csv2ddl = require('./lib/csv2ddl')
  await csv2ddl('./in/def-mysql.tsv', './in/ddl.tsv', './out/ddl.sql')
})()
