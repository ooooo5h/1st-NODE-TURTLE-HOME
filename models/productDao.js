const db = require("../config/mysql");

const getAllProducts = async () => {
    const sql = `
    SELECT 
        * 
    FROM 
        products`

    const [rows, fields] = await db.query(sql);
    return rows
}

const getProductById = async (productId) => {
    const sql = `
    SELECT
        *
    FROM
        products
    WHERE
        id = ${productId}`

    const [rows, fields] = await db.query(sql);
    return rows
}

module.exports = {
    getAllProducts,
    getProductById
}