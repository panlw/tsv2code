(async function () {
  const tsv2dml = require('./lib/tsv2dml')
  await tsv2dml('./in/dml.tsv', './out/dml.sql')
})()
