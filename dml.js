const csv2dml = require('./lib/csv2dml');

const csvTblDataFiles = [
  './dml/EGB2B/S_MENU.csv',
  './dml/EGB2B/S_ROLE.csv',
];
const outFile = './out/dml.sql';

csv2dml(csvTblDataFiles, outFile);
