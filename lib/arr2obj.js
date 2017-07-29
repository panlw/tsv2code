module.exports = function (arr) {
  return arr.reduce((cols, col, idx) => {
    if (col) cols[col] = idx;
    return cols;
  }, {});
};
