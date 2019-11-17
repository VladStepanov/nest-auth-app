module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.DB_PORT,
  username: process.env.DB_LOGIN,
  password: process.env.DB_PASS,
  database: 'nest_test',
  // database: process.env.NODE_ENV !== 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME_DEV,
  dropSchema: true,
  // dropSchema: process.env.NODE_ENV === 'test',
  synchronize: true,
  entities: [
    './dist/**/*.entity.js'
  ]
};
