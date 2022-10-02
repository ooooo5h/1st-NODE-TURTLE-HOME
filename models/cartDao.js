const {myDataSource} = require("../utils/database");

const checkIfProductExists = async (productId, sizeId) => {
    const sql = `
        SELECT 
            p.id AS product_id, p.name AS product_name, po.price, po.size_id
        FROM 
            products AS p
        JOIN 
            products_options AS po
        ON 
            po.product_id = p.id
        WHERE 
            p.id=${productId} AND po.size_id=${sizeId};`
    const [rows, ] = await myDataSource.query(sql);
    return rows
}

const checkCartId = async (productId, sizeId, userId) => {
    const sql = `
        SELECT 
            c.id,  c.user_id, po.product_id, po.size_id, c.product_option_id, c.quantity, po.price
        FROM 
            carts AS c
        JOIN 
            products_options AS po
        ON 
            c.product_option_id = po.id
        WHERE 
            po.product_id=${productId} AND po.size_id=${sizeId} AND c.user_id=${userId};`
    const [rows, ] = await myDataSource.query(sql);
    return rows
}

const getProductOptionId = async (productId, sizeId) => {
    const sql = `
        SELECT
            po.id 
        FROM
            products_options AS po
        WHERE 
            po.product_id = ${productId} AND po.size_id = ${sizeId}`
    const [rows, ] = await myDataSource.query(sql);
    return rows
}

const createCart = async (productOptionId, quantity, userId) => {
    const sql = `
        INSERT INTO
            carts 
            (quantity, product_option_id, user_id) 
        VALUES
            (${quantity}, ${productOptionId}, ${userId})`
    await myDataSource.query(sql);
}

const addCart = async (productOptionId, quantity, userId) => {
    const sql = `
        UPDATE 
            carts AS c 
        SET
            c.quantity = c.quantity + ${quantity}
        WHERE
            c.product_option_id = ${productOptionId} AND c.user_id = ${userId}`
    await myDataSource.query(sql);    
}

const getCartByUserId = async (userId) => {
    const sql = `
        SELECT
            p.id AS product_id, p.name AS product_name, po.size_id AS option_id, s.name AS option_name , c.quantity, po.price 
        FROM 
            carts AS c
        JOIN 
            products_options AS po
        ON 
            c.product_option_id = po.id
        JOIN  
            products AS p
        ON 
            po.product_id = p.id
        JOIN 
            sizes AS s
        ON 
            po.size_id = s.id
        WHERE
            c.user_id = ${userId}`
    const [rows, ] = await myDataSource.query(sql)
    return rows
}

const getCartById = async (cartId) => {
    const sql = `
        SELECT 
            c.id 
        FROM 
            carts AS c 
        WHERE c.id = ${cartId};
        `
    const [rows, ] = await myDataSource.query(sql)
    return rows
}

const getCartMatchWithUserID = async (userId, cartId) => {
    const sql = `
        SELECT 
            c.id, c.product_option_id, c.quantity, c.user_id
        FROM 
            carts AS c
        WHERE 
            c.user_id = ${userId} AND c.id = ${cartId};`
    const [rows, ] = await myDataSource.query(sql)
    return rows
}

const deleteCartById = async (cartId) => {
    const sql = `
        DELETE 
        FROM 
            carts 
        WHERE carts.id = ${cartId};`
    await myDataSource.query(sql)
}

const deleteAllCartByUserId = async (userId) => {
    const sql = `
    DELETE
    FROM 
        carts
    WHERE 
        carts.user_id = ${userId};
    `
    await myDataSource.query(sql);
}

module.exports = {
    checkIfProductExists,
    checkCartId,
    getProductOptionId,
    createCart,
    addCart,
    getCartByUserId,
    getCartById,
    deleteCartById,
    deleteAllCartByUserId,
    getCartMatchWithUserID
}