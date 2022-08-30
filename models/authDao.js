const db = require("../config/mysql");

const getUserByRefreshToken = async (refreshToken) => {
    const sql = `
    SELECT
        u.refresh_token
    FROM
        users AS u
    WHERE
        u.refresh_token = "${refreshToken}"
    `
    const [rows, ] = await db.query(sql)
    return rows
}

module.exports = {
    getUserByRefreshToken
};