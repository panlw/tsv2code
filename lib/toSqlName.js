function toSqlName(dbType, name) {
  return dbType === 'mysql' ? ('`' + name + '`') : name
}

function toSqlNames(dbType, names) {
  return names.split(',').map(name => toSqlName(dbType, name)).join(',')
}

module.exports = { toSqlName, toSqlNames }
