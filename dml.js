const csv2dml = require('./lib/csv2dml');

const csvTblDataFiles = [
  './dml/egb2b/S_MENU.tsv',
  './dml/egb2b/S_ROLE.tsv',
];
const outFile = './out/dml.sql';

csv2dml(csvTblDataFiles, outFile);
