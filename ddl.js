const csv2ddl = require('./lib/csv2ddl');

const baseDir = './ddl/sample';
const csvAliasFile = baseDir + '/aliases.tsv';
const csvTblDefFiles = [
  baseDir + '/system.tsv',
  baseDir + '/cust.tsv',
];
const outFile = './out/ddl.sql';

csv2ddl(csvTblDefFiles, csvAliasFile, outFile);
