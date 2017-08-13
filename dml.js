const csv2dml = require('./lib/csv2dml');

const baseDir = './dml/egb2b';
const csvTblDataFiles = [
  baseDir + '/S_MENU.tsv',
  baseDir + '/S_ROLE.tsv',
  baseDir + '/S_MGMT_USER.tsv',
];
const outFile = './out/dml.sql';

csv2dml(csvTblDataFiles, outFile);
