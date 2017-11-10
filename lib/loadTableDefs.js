const fs = require('fs')
const readline = require('readline')

const arr2obj = require('./arr2obj')

const DEF_IDX = arr2obj([
  'FLAG', 'DESC', 'NAME', 'TYPE', 'SIZE', 'DVAL', 'PK'
])

const cellOf = (line, cidx) => line.length > cidx ? line[cidx] : ''
const flagOf = (line) => cellOf(line, DEF_IDX['FLAG'])

const isTblDef = line => flagOf(line) === 'T'
const isColDef = line => flagOf(line) === 'C'

const toTblDef = function (line) {
  return {
    desc: line[DEF_IDX['DESC']],
    name: line[DEF_IDX['NAME']],
    type: line[DEF_IDX['TYPE']],
    sync: line[DEF_IDX['SIZE']],
    ixes: line.slice(DEF_IDX['PK']),
    cols: []
  }
}

const toNum = function (numText) {
  return numText ? parseInt(numText) : 0
}

const toColDef = function (line) {
  return {
    name: line[DEF_IDX['NAME']],
    desc: line[DEF_IDX['DESC']],
    type: line[DEF_IDX['TYPE']],
    size: line[DEF_IDX['SIZE']],
    dval: line[DEF_IDX['DVAL']],
    ixes: line.slice(DEF_IDX['PK']).map(ix => toNum(ix))
  }
}

const numSort = function (n1, n2) {
  if (n1 > n2) return 1
  if (n1 < n2) return -1
  return 0
}

const toIxKeys = function (cols, ixix) {
  return cols
    .filter(col => col.ixes[ixix])
    .sort((col1, col2) => numSort(col1.ixes[ixix], col2.ixes[ixix]))
    .map(col => col.name)
    .join(',')
}

const collect = function (tblDefs, tblDef) {
  if (!tblDef) return
  tblDef.ixes = tblDef.ixes
    .reduce((ixes, ixFlag, ixix) => {
      ixes.push({
        uniq: ixFlag === 'U',
        keys: toIxKeys(tblDef.cols, ixix)
      })
      return ixes
    }, []) // console.log(tblDef.ixes)
  tblDef.id = !!findIdCol(tblDef.cols)
  tblDefs.push(tblDef)
  return tblDefs
}

const findIdCol = function (cols) {
  return cols.find(col => col.name === 'ID' && col.type === 'ID')
}

const loadTableDefs = function (defFile, opts) {
  return new Promise((resolve, reject) => {
    var tblDefs = []
    var tblDef = null
    readline
      .createInterface({
        input: fs.createReadStream(defFile)
      })
      .on('line', (rawLine) => {
        const line = rawLine.split('\t')
        if (isTblDef(line)) {
          tblDef && collect(tblDefs, tblDef)
          tblDef = toTblDef(line) // console.log('tblDef', tblDef)
        } else if (tblDef && isColDef(line)) {
          tblDef.cols.push(toColDef(line))
        }
      })
      .on('error', reject)
      .on('close', function () {
        tblDef && collect(tblDefs, tblDef)
        resolve(tblDefs)
      })
  })
}

module.exports = loadTableDefs
