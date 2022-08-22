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

module.exports = {
  createUser,
};