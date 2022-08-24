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
        ${sortObject[`${sort}`]}
        `;
    const [rows, fields] = await db.query(sql);
    return rows;
};

const getProductById = async (productId) => {
  const sql = `
    SELECT
        products.id, 
        products.name,
        products.number,
        products.description,
        products.image_url,
    FROM
        products
    WHERE
        id = ${productId}
    `;

  const [rows, fields] = await db.query(sql);
  return rows;
};

module.exports = {
  getAllProducts,
  getProductById,
  getSortedProducts,
};