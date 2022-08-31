const db = require("../utils/database");

const createUser = async (user) => {
  const sql = `
    INSERT INTO 
        users 
        (korean_name, email, password, address, phone_number) 
    VALUES 
        ('${user.korean_name}', '${user.email}', '${user.password}', '${user.address}', '${user.phone_number}');`;
    await db.query(sql);
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
    const [rows, fields] = await db.query(sql);
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
    const [rows, ] = await db.query(sql);
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
    await db.query(sql);
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  saveUserRefreshToken
};