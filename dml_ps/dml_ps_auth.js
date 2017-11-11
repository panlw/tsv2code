const PASSWORD = '9be73aec844e3371b1cc7a0aefb8806505d586586930cfbb8a524540e3fe0392'
const SALT = 'Ek9IaAamQMoi0eSp'

const USER_COLS = 'LOGIN_NO,PASSWORD,SALT,USER_NAME,USER_TYPE'
const USER_ROWS = [{
  login_no: 'admin',
  password: PASSWORD,
  salt: SALT,
  user_name: '系统管理员',
  user_type: 'SYS'
}, {
  login_no: 'tom',
  password: PASSWORD,
  salt: SALT,
  user_name: '汤姆 (店长)',
  user_type: 'PSM'
}]

const MENU_COLS = 'ID,TITLE,DESC,URI'
const MENU_ROWS = [{
  id: 1,
  title: 'Fish',
  desc: 'Saltwater, Freshwater',
  uri: 'fish',
}, {
  id: 2,
  title: 'Dogs',
  desc: 'Various Breeds',
  uri: 'dogs',
}, {
  id: 3,
  title: 'Reptiles',
  desc: 'Lazards, Turtles, Snakes',
  uri: 'reptiles',
}, {
  id: 4,
  title: 'Cats',
  desc: 'Various Breeds, Exotic Varieties',
  uri: 'cats',
}, {
  id: 5,
  title: 'Birds',
  desc: 'Exotic Varieties',
  uri: 'birds',
}]

const toRowDefs = function (cols, rows) {
  const props = cols.toLowerCase().split(',')
  return rows.map(m => props.reduce((row, prop) => row.push(m[prop]) && row, []))
}

module.exports = [{
  name: 'PS_S_USER',
  cols: USER_COLS,
  rows: toRowDefs(USER_COLS, USER_ROWS)
}, {
  name: 'PS_S_MENU',
  cols: MENU_COLS,
  rows: toRowDefs(MENU_COLS, MENU_ROWS)
}]
