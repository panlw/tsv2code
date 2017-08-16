const csv2dml = require('./lib/csv2dml');

const baseDir = './dml/egb2b';
const csvTblDataFiles = [
  baseDir + '/S_MENU.tsv',
  baseDir + '/S_ROLE.tsv',
  baseDir + '/S_COUNTER.tsv',
  baseDir + '/S_MGMT_USER.tsv',
  // baseDir + '/M_LOGISTIC.tsv',
  // baseDir + '/M_BP_LOGISTIC.tsv',
];
const outFile = './out/dml.sql';

csv2dml(csvTblDataFiles, outFile);
