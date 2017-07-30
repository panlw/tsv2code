const csv2ddl = require('./lib/csv2ddl');

const csvAliasFile = './ddl/egb2b/aliases.tsv';
const csvTblDefFiles = [
  './ddl/egb2b/system.tsv',
  './ddl/egb2b/cust.tsv',
];
const outFile = './out/ddl.sql';

csv2ddl(csvTblDefFiles, csvAliasFile, outFile);
