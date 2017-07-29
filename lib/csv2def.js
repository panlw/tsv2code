const Promise = require('bluebird');

const loadAliases = require('./loadAliases');
const loadTableDefs = require('./loadTableDefs');

const csvLoad = function (tblDefFiles, aliasFile, csvParseOpts) {
  var qs = tblDefFiles.map(f => loadTableDefs(f, csvParseOpts));
  qs.push(loadAliases(aliasFile, csvParseOpts));
  return Promise.all(qs);
};

const csv2def = function (csvTblDefsFiles, csvAliasFile, csvParseOpts) {
  return csvLoad(csvTblDefsFiles, csvAliasFile, csvParseOpts)
    .then(defs => {
      const aliases = defs.pop();
      const tblDefs = defs
        .reduce((merged, def) => {
          Array.prototype.push.apply(merged, def.tblDefs);
          return merged;
        }, []);
      return { tblDefs, aliases };
    });
}

module.exports = csv2def;
