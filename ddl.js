const csv2ddl = require('./lib/csv2ddl');

const baseDir = './ddl/egb2b';
const csvAliasFile = baseDir + '/aliases.tsv';
const csvTblDefFiles = [
  baseDir + '/sys.tsv',
  // baseDir + '/mst.tsv',
];
const outFile = './out/ddl.sql';

csv2ddl(csvTblDefFiles, csvAliasFile, outFile);
