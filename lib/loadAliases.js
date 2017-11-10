const fs = require('fs')
const readline = require('readline')

const COLS_IDX = require('./arr2obj')([
  'ALIAS', 'TYPE', 'SIZE', 'DVAL', 'DESC'
])

const toAliasDef = function (line) {
  return {
    alias: line[COLS_IDX['ALIAS']],
    type: line[COLS_IDX['TYPE']],
    size: line[COLS_IDX['SIZE']],
    dval: line[COLS_IDX['DVAL']]
  }
}

module.exports = function (file) {
  return new Promise((resolve, reject) => {
    var defs = {}
    readline
      .createInterface({
        input: fs.createReadStream(file)
      })
      .on('line', (rawLine) => {
        const line = rawLine.split('\t')
        if (line[COLS_IDX['ALIAS']]) {
          const def = toAliasDef(line)
          defs[def.alias] = def
        }
      })
      .on('error', reject)
      .on('close', function () {
        resolve(defs)
      })
  })
}
