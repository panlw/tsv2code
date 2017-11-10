const fs = require('fs')
const dots = require('./lib/dots')
const Mock = require('mockjs')
const Random = Mock.Random

const typeNames = ['', '鱼', '狗', '爬行类', '猫', '鸟']

function formatNumber (n, m) {
  return (m + n + '').substr(1)
}

function toSqlVal (val) {
  return typeof val === 'string' ? ("'" + val + "'") : val
}
function toSqlRow (row) {
  return row.map(val => toSqlVal(val))
}

const rows = 32
const mock = Mock.mock({
  ['rows|' + rows]: [[
    /[1-5]/,
    function () { // 产品号=PS+类型(3位)+N序列号(4位)，例：PS999N9999
      return 'PS00' + this[0] + formatNumber(Random.increment(), 10000)
    },
    function () {
      return typeNames[this[0]] + Random.string('upper', 2)
    }
  ]]
})

const tpl = 'dml'
const tbl = {
  name: 'M_PET',
  cols: 'type,code,name'
}
tbl.rows = mock.rows.map(row => toSqlRow(row))

const csv2dml = function (dmlFile) {
  fs.writeFileSync(dmlFile, '')
  fs.appendFileSync(dmlFile, dots[tpl](tbl))
}

csv2dml('./out/dml.sql')
