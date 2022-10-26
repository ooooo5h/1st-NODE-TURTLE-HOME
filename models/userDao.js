const { myDataSource } = require("../utils/database");

const createUser = async (user) => {
  await myDataSource.query(
    `
  INSERT INTO 
    users 
    (korean_name, email, password, address, phone_number) 
  VALUES 
    (?, ?, ?, ?, ?)
   `,
    [
      user.korean_name,
      user.email,
      user.password,
      user.address,
      user.phone_number,
    ]
  );
};

const getUserByEmail = async (userEmail) => {
  const [rows] = await myDataSource.query(
    `
  SELECT 
      id, korean_name, password 
  FROM 
      users
  WHERE 
      email = ?
  `,
    [userEmail]
  );
  return rows;
};

const getUserById = async (userId) => {
  const [rows] = await myDataSource.query(
    `
  SELECT
      users.id
  FROM
      users
  WHERE
      users.id = ?
  `,
    [userId]
  );
  return rows;
};

const saveUserRefreshToken = async (userId, refreshToken) => {
  await myDataSource.query(
    `
  UPDATE 
      users
  SET
      users.refresh_token = ?
  WHERE
      users.id = ?
  `,
    [refreshToken, userId]
  );
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  saveUserRefreshToken,
};
