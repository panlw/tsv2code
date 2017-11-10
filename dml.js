(async function () {
  const csv2dml = require('./lib/csv2dml')
  await csv2dml('./in/dml.tsv', './out/dml.sql')
})()
