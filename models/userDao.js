const db = require("../config/mysql");

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

module.exports = {
  createUser,
  getUserByEmail
};