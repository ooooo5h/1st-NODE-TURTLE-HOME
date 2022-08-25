const db = require("../config/mysql");

const getAllProducts = async () => {
    const sql = `
        SELECT 
            p.id, p.name, p.image_url, min(price) as 'min_price', max(price) as 'max_price'
        FROM 
            products_options as po
        JOIN 
            products as p on p.id = po.product_id
        GROUP BY 
            product_id;`;
    const [rows, fields] = await db.query(sql);
    return rows;
};

const getSortedProducts = async (sort) => {
    const sortObject = {
        1: "ORDER BY p.created_at DESC",
        2: "ORDER BY max_price DESC",
        3: "ORDER BY min_price ASC"
    };

    const sql = `
        SELECT 
            p.id, p.name, p.number, p.description, p.image_url, p.created_at, min(price) as 'min_price', max(price) as 'max_price'
        FROM
            products_options as po
        JOIN 
            products as p on p.id = po.product_id
        GROUP BY
            product_id
        ${sortObject[`${sort}`]}`;
    const [rows, fields] = await db.query(sql);
    return rows;
};

const getProductById = async (productId) => {
    const sql = `
        SELECT 
            p.id, p.name, p.number, p.description, p.image_url, group_concat(json_object('size', s.name, 'price', po.price) separator '@') as options
        FROM 
            products as p
        INNER JOIN 
            products_options as po on po.product_id = p.id
        INNER JOIN 
            sizes as s on s.id = po.size_id
        WHERE 
            p.id=${productId};
        `;

    const [rows, fields] = await db.query(sql);

    const data = rows[0] 

    data.options = data.options.split('@')
    data.options = data.options.map(result => {
        return JSON.parse(result)
    })
    return data
};

module.exports = {
    getAllProducts,
    getProductById,
    getSortedProducts,
};