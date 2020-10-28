const databaseInfo = {
  dbName: 'test',
  host: '39.106.59.1:27017',
  userName: 'test_admin',
  password: '111111'
}
module.exports = {
  databaseUrl: `mongodb://${databaseInfo.userName}:${databaseInfo.password}@${databaseInfo.host}/${databaseInfo.dbName}`
}
