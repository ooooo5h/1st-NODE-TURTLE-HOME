const db = require("../config/mysql");

const checkIfProductExists = async (productId, sizeId) => {
    try {
        sql = `
        SELECT 
            p.id AS product_id, p.name AS product_name, po.price, po.size_id
        FROM 
            products AS p
        JOIN 
            products_options AS po
        ON 
            po.product_id = p.id
        WHERE p.id=${productId} AND po.size_id=${sizeId};
        `
        const [rows, ] = await db.query(sql);
        return rows

    } catch (e) {
        console.log(e);
    }
}

const checkCartId = async (productId, sizeId, userId) => {
    try {
        sql = `
        SELECT 
            c.id,  c.user_id, po.product_id, po.size_id, c.product_option_id, c.quantity, po.price
        FROM 
            carts AS c
        JOIN 
            products_options AS po
        ON 
            c.product_option_id = po.id
        WHERE po.product_id=${productId} AND po.size_id=${sizeId} AND c.user_id=${userId};
        `
        const [rows, ] = await db.query(sql);
        return rows

    } catch (e) {
        console.log(e)
    }
}

const getProductOptionId = async (productId, sizeId) => {
    try {
        sql = `
        SELECT
            po.id 
        FROM
            products_options AS po
        WHERE 
            po.product_id = ${productId} AND po.size_id = ${sizeId}
        `
        const [rows, ] = await db.query(sql);
        return rows

    } catch (e) {
        console.log(e);
    }
}

const createCart = async (productOptionId, quantity, userId) => {
    try {
        sql = 
        `
        INSERT INTO
            carts 
            (quantity, product_option_id, user_id) 
        VALUES
            (${quantity}, ${productOptionId}, ${userId})
        `
        await db.query(sql);

    } catch (e) {
        console.log(e);
    }
}

const addCart = async (productOptionId, quantity, userId) => {
    try {
        sql = `
        UPDATE 
            carts AS c 
        SET
            c.quantity = c.quantity + ${quantity}
        WHERE
            c.product_option_id = ${productOptionId} AND c.user_id = ${userId}
        `
        await db.query(sql);
        
    } catch (e) {
        console.log(e);
    }
}

const getCartByUserId = async (userId) => {
    sql = `
    SELECT
        p.id AS product_id, p.name AS product_name, po.size_id AS option_id, s.name AS option_name ,po.price 
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
        c.user_id = ${userId}
    `
    const [rows, ] = await db.query(sql)
    return rows
}

module.exports = {
    checkIfProductExists,
    checkCartId,
    getProductOptionId,
    createCart,
    addCart,
    getCartByUserId
}