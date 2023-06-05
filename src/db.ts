import mysql from 'mysql2/promise';

const connection = async () => {
  const conn = await mysql.createConnection({
    host: '109.73.168.194',
    port: 3306,
    user: 'camgirla_new',
    password: 'd56s4g8are',
    database: 'camgirla_wp744',
  });

  return conn;
};

export default connection;
