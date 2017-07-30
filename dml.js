const csv2dml = require('./lib/csv2dml');

const baseDir = './dml/sample';
const csvTblDataFiles = [
  baseDir + '/S_MENU.tsv',
  baseDir + '/S_ROLE.tsv',
];
const outFile = './out/dml.sql';

csv2dml(csvTblDataFiles, outFile);
