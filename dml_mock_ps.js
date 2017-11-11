const Mock = require('mockjs')
const Random = Mock.Random
const fs = require('fs')
const dots = require('./lib/dots')
const toSqlTbl = require('./lib/toSqlTbl')

function leftPad (num, len) {
  return (Math.pow(10, len) + num + '').substr(1)
}
function nextSeq (len) {
  return leftPad(Random.increment(), len)
}
function nextItemSeq () {
  return nextSeq(4)
}
function nextItemCode (itemType) {
  // PS+类型(3位)+N序列号(4位)，例：PS999N9999
  return 'PS00' + itemType + nextItemSeq()
}
function nextItemName (itemType) {
  return Random.first() + ' (' + typeNames[itemType] + ')'
}

const itemCount = 32
const typeNames = ['', '鱼', '狗', '爬行类', '猫', '鸟']
const itemRowDef = [
  /[1-5]/, // TYPE
  function () { // CODE
    return nextItemCode(this[0])
  },
  function () { // NAME
    return nextItemName(this[0])
  },
  function () { // PRC_D4
    return Random.integer(6000, 100000) * 100
  }
]
const itemTblDef = {
  name: 'PS_M_ITEM',
  cols: 'TYPE,CODE,NAME,PRC_D4',
  rows: Mock.mock({
    ['rows|' + itemCount]: [itemRowDef]
  }).rows
}

var itemIdx = 0
const itemCodes = itemTblDef.rows.map(row => row[1])
const invRowDef = [
  () => itemCodes[itemIdx++], // ITEM_CODE
  '@integer(6000, 10000)', // QTY_ON_HAND
  0 // QTY_OF_LOCK
]
const invTblDef = {
  name: 'PS_T_INV',
  cols: 'ITEM_CODE,QTY_ON_HAND,QTY_OF_LOCK',
  rows: Mock.mock({
    ['rows|' + itemCount]: [invRowDef]
  }).rows
}

const dmlFile = './out/dml.sql'
fs.writeFileSync(dmlFile, '')
fs.appendFileSync(dmlFile, dots.dml(toSqlTbl(itemTblDef)))
fs.appendFileSync(dmlFile, dots.dml(toSqlTbl(invTblDef)))
