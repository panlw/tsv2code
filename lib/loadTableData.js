const fs = require('fs')
const readline = require('readline')

const loadTableData = function (file) {
  return new Promise((resolve, reject) => {
    var tblData
    readline
      .createInterface({
        input: fs.createReadStream(file)
      })
      .on('line', (rawLine) => {
        const line = rawLine.split('\t')
        if (!tblData) { // line 1 -> col range, table name
          const col0 = line.findIndex(val => !!val)
          tblData = { file, name: line[col0], col0, rows: [] }
          tblData.col1 = line.indexOf(tblData.name, tblData.col0 + 1)
          if (tblData.col0 === -1 || tblData.col1 === -1) {
            throw new Error(`[DML] the first line is invalid: [${col0}, ${tblData.col1}]`)
          }
        } else if (!tblData.ctgs) { // line 2 -> empty is string
          tblData.ctgs = line.slice(tblData.col0, tblData.col1 + 1)
        } else if (!tblData.cols) { // line 3 -> col names
          tblData.cols = line.slice(tblData.col0, tblData.col1 + 1).join(',')
        } else { // data rows
          if (!line[tblData.col0]) return // empty line
          const row = line.slice(tblData.col0, tblData.col1 + 1)
            .map((val, idx) => !tblData.ctgs[idx] ? /* val is a string ? */ `'${val}'` : val)
          tblData.rows.push(row)
        }
      })
      .on('error', reject)
      .on('close', function () {
        resolve(tblData)
      })
  })
}

module.exports = loadTableData
