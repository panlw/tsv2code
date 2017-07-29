const fs = require('fs');
const csv = require('csv');
const Promise = require('bluebird');

const arr2obj = require('./arr2obj');

const COLS_IDX = arr2obj([
  'ALIAS', 'TYPE', 'SIZE', 'DVAL', 'DESC'
]);

const toAliasDef = function (line) {
  return {
    alias: line[COLS_IDX['ALIAS']],
    type: line[COLS_IDX['TYPE']],
    size: line[COLS_IDX['SIZE']],
    dval: line[COLS_IDX['DVAL']],
  }
};

const loadAliases = function (file, opts) {
  return new Promise((resolve, reject) => {
    var defs = {};
    fs.createReadStream(file)
      .on('close', function () {
        resolve(defs);
      })
      .on('error', reject)
      .pipe(csv.parse(opts))
      .pipe(csv.transform(line => {
        if (line[COLS_IDX['ALIAS']]) {
          const def = toAliasDef(line);
          defs[def.alias] = def;
        }
      }));
  });
};

module.exports = loadAliases;
