const { myDataSource } = require("../utils/database");

const createUser = async (user) => {
  const sql = `
    INSERT INTO 
        users 
        (korean_name, email, password, address, phone_number) 
    VALUES 
        ('${user.korean_name}', '${user.email}', '${user.password}', '${user.address}', '${user.phone_number}');`;
    await myDataSource.query(sql);
};

const getUserByEmail = async (userEmail) => {
    const sql = `
    SELECT 
        * 
    FROM 
        users
    WHERE 
        email = '${userEmail}';
    `
    const [rows, ] = await myDataSource.query(sql);
    return rows
}

const getUserById = async (userId) => {
    const sql = `
    SELECT
        users.id
    FROM
        users
    WHERE
        users.id = ${userId}
    `
    const [rows, ] = await myDataSource.query(sql);
    return rows
}

const saveUserRefreshToken = async (userId, refreshToken) => {
    const sql = `
    UPDATE 
        users
    SET
        users.refresh_token = '${refreshToken}'
    WHERE
        users.id = ${userId}
    `
    await myDataSource.query(sql);
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  saveUserRefreshToken
};