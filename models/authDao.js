const {myDataSource} = require("../utils/database");

const getUserByRefreshToken = async (refreshToken) => {
    const sql = `
    SELECT
        u.id
    FROM
        users AS u
    WHERE
        u.refresh_token = "${refreshToken}"
    `
    const [rows, ] = await myDataSource.query(sql)
    return rows
}

module.exports = {
    getUserByRefreshToken
};