const fs = require('fs');
const csv = require('csv');
const Promise = require('bluebird');

const arr2obj = require('./arr2obj');

const TBL_IDX = arr2obj([
  'MILESTONE', 'DESC', 'NAME', 'TYPE', 'SYNC'
]);
const COL_IDX = arr2obj([
  'MILESTONE', 'DESC', 'NAME',
  'TYPE', 'SIZE', 'DVAL',
  'PK', 'UI1', 'UI2',
]);
const IDX_COL = ['PK', 'UI1', 'UI2'];

const isTblDef = line => line[TBL_IDX['TYPE']] === 'table';
const isViewDef = line => line[TBL_IDX['TYPE']] === 'view';
const isColDef = line => !!line[COL_IDX['NAME']];

const toTblDef = function (line) {
  return {
    name: line[TBL_IDX['NAME']],
    desc: line[TBL_IDX['DESC']],
    sync: line[TBL_IDX['SYNC']],
    cols: [],
  };
};

const toNum = function (numText) {
  return numText ? parseInt(numText) : 0;
}

const toColDef = function (line) {
  return {
    name: line[COL_IDX['NAME']],
    desc: line[COL_IDX['DESC']],
    type: line[COL_IDX['TYPE']],
    size: line[COL_IDX['SIZE']],
    dval: line[COL_IDX['DVAL']],
    uidx: IDX_COL.map(col => toNum(line[COL_IDX[col]]))
  };
};

const numSort = function (n1, n2) {
  if (n1 > n2) return 1;
  if (n1 < n2) return -1;
  return 0;
}

const buildUidx = function (cols, idx) {
  return cols
    .filter(col => col.uidx[idx])
    .sort((col1, col2) => numSort(col1.uidx[idx], col2.uidx[idx]))
    .map(col => col.name)
    .join(',');
};

const collect = function (tblDefs, tblDef) {
  if (!tblDef) return;
  tblDef.uidx = IDX_COL
    .reduce((uidx, key, idx) => {
      uidx[key.toLowerCase()] = buildUidx(tblDef.cols, idx);
      return uidx;
    }, {});
  tblDef.id = !!findIdCol(tblDef.cols);
  tblDefs.push(tblDef);
  return tblDefs;
};

const findIdCol = function (cols) {
  return cols.find(col => col.name === 'ID' && col.type === 'ID');
};

const demoTblDefs = function () {
  const tblDef = {
    name: 'S_DEMO', desc: '测试', cols: [
      { desc: '字段1', name: 'col1', type: 'TEXT', size: '10', dval: '', uidx: [0, 1, 0] },
      { desc: '字段2', name: 'col2', type: 'UDC', size: '', dval: '', uidx: [1, 0, 1] },
      { desc: '字段3', name: 'col3', type: 'SEQ', size: '', dval: '', uidx: [2, 0, 0] },
      { desc: '字段4', name: 'col4', type: 'BOOL', size: '', dval: '', uidx: [0, 0, 0] },
    ]
  };
  return { file: 'DEMO.csv', tblDefs: collect([], tblDef) };
}

const loadTableDefs = function (file, opts) {
  // if (1) return Promise.resolve(demoTblDefs());
  return new Promise((resolve, reject) => {
    var tblDefs = [], tblDef;
    fs.createReadStream(file)
      .on('close', function () {
        collect(tblDefs, tblDef);
        resolve({ file, tblDefs });
      })
      .on('error', reject)
      .pipe(csv.parse(opts))
      .pipe(csv.transform(line => {
        if (isTblDef(line)) {
          collect(tblDefs, tblDef);
          tblDef = toTblDef(line);
        } else if (isViewDef(line)) {
          collect(tblDefs, tblDef);
          tblDef = void 0;
        } else if (tblDef && isColDef(line)) {
          tblDef && tblDef.cols.push(toColDef(line));
        }
      }));
  });
};

module.exports = loadTableDefs;
