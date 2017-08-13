const fs = require('fs');

const dots = require('./dots');
const csv2def = require('./csv2def');

const csvParseOpts = { delimiter: "\t" };

const transTypes = function (cols, aliases) {
  cols.forEach(col => {
    const alias = aliases[col.type];
    if (alias) {
      col.type = alias.type;
      col.size = col.size || alias.size;
      col.dval = col.dval || alias.dval;
    }
    col.type = col.type.toLowerCase();
    col.dval = col.dval? ('DEFAULT ' + col.dval) : 'not null';
  });
};

const csv2ddl = function (csvTblDefsFiles, csvAliasFile, ddlFile) {
  return csv2def(csvTblDefsFiles, csvAliasFile, csvParseOpts)
    .then(({ tblDefs, aliases }) => {
      fs.writeFileSync(ddlFile, '');
      tblDefs.forEach(def => {
          transTypes(def.cols, aliases);
          fs.appendFileSync(ddlFile, dots.tbl(def));
        });
    });
}

module.exports = csv2ddl;
