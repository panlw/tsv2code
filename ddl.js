const csv2ddl = require('./lib/csv2ddl');

const csvAliasFile = './ddl/EGB2B/aliases.csv';
const csvTblDefFiles = [
  './ddl/EGB2B/system.csv',
  './ddl/EGB2B/cust.csv',
];
const outFile = './out/ddl.sql';

csv2ddl(csvTblDefFiles, csvAliasFile, outFile);
