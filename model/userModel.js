const { poolPromise } = require("./index");

exports.addNewUser = async function (userInfo) {
  const { id, hashedPassword, username ,email,age,gender } = userInfo;

  const pool = await poolPromise;
  // await pool.query`IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users')
  //   CREATE TABLE users (
  //     user_id VARCHAR(50) PRIMARY KEY,
  //     password VARCHAR(255) not null, 
  //     username NVARCHAR(20) not null,
  // created_at DATETIME      DEFAULT (getdate()) NOT NULL,
  //     email VARCHAR(255) not null,
  //     age INT not null,
  //     gender VARCHAR(10) not null 
  //   )`;
  await pool.query`INSERT INTO users(user_id, password, username, email, age , gender) VALUES
                      (${id}, ${hashedPassword}, ${username}, ${email}, ${age}, ${gender});`;
};

exports.getUserById = async function (id) {
  const pool = await poolPromise;
  const { recordset } =
    await pool.query`SELECT * FROM users WHERE user_id = ${id}`;
  return recordset;
};

exports.checkIdDuplication = async function (id) {
  const pool = await poolPromise;
  const { recordset } =
    await pool.query`SELECT user_id FROM users WHERE user_id = ${id}`;

  if (recordset.length > 0) {
    return true;
  }
  return false;
};
