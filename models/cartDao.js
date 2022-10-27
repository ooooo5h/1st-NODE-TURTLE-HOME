const { myDataSource } = require("../utils/database");

const checkIfProductExists = async (productId, sizeId) => {
  const [rows] = await myDataSource.query(
    `
  SELECT 
      p.id AS product_id, p.name AS product_name, po.price, po.size_id
  FROM 
      products AS p
  JOIN 
      products_options AS po
  ON 
      po.product_id = p.id
  WHERE 
      p.id=? AND po.size_id=?`,
    [productId, sizeId]
  );
  return rows;
};

const checkCartId = async (productId, sizeId, userId) => {
  const [rows] = await myDataSource.query(
    `
  SELECT 
      c.id,  c.user_id, po.product_id, po.size_id, c.product_option_id, c.quantity, po.price
  FROM 
      carts AS c
  JOIN 
      products_options AS po
  ON 
      c.product_option_id = po.id
  WHERE 
      po.product_id=? AND po.size_id=? AND c.user_id=?;`,
    [productId, sizeId, userId]
  );
  return rows;
};

const getProductOptionId = async (productId, sizeId) => {
  const [rows] = await myDataSource.query(
    `
  SELECT
      po.id 
  FROM
      products_options AS po
  WHERE 
      po.product_id = ? AND po.size_id = ?`,
    [productId, sizeId]
  );
  return rows;
};

const createCart = async (productOptionId, quantity, userId) => {
  await myDataSource.query(
    `
  INSERT INTO
      carts 
      (quantity, product_option_id, user_id) 
  VALUES
      (?, ?, ?)`,
    [quantity, productOptionId, userId]
  );
};

const addCart = async (productOptionId, quantity, userId) => {
  await myDataSource.query(
    `
  UPDATE 
      carts AS c 
  SET
      c.quantity = c.quantity + ?
  WHERE
      c.product_option_id = ? AND c.user_id = ?`,
    [quantity, productOptionId, userId]
  );
};

const getCartByUserId = async (userId) => {
  const [rows] = await myDataSource.query(
    `
    SELECT u.korean_name AS user_name,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'product_id', p.id,
            'product_name', p.name,
            'quantity', c.quantity,
            'size', s.name,
            'product_price', po.price
        )
    ) AS carts
    FROM carts AS c
    JOIN products_options AS po
    ON c.product_option_id = po.id
    JOIN products AS p
    ON po.product_id = p.id
    JOIN sizes AS s
    ON po.size_id = s.id
    JOIN users AS u
    ON c.user_id = u.id
    WHERE u.id= ?
    GROUP BY u.id;
    `,
    [userId]
  );
  return rows;
};

const getCartById = async (cartId) => {
  const [rows] = await myDataSource.query(
    `
  SELECT 
      c.id 
  FROM 
      carts AS c 
  WHERE c.id = ?
  `,
    [cartId]
  );
  return rows;
};

const getCartMatchWithUserID = async (userId, cartId) => {
  const [rows] = await myDataSource.query(
    `
  SELECT 
      c.id, c.product_option_id, c.quantity, c.user_id
  FROM 
      carts AS c
  WHERE 
      c.user_id = ? AND c.id = ?`,
    [userId, cartId]
  );
  return rows;
};

const deleteCartById = async (cartId) => {
  await myDataSource.query(
    `
  DELETE 
  FROM 
      carts 
  WHERE carts.id = ?`,
    [cartId]
  );
};

const deleteAllCartByUserId = async (userId) => {
  await myDataSource.query(
    `
  DELETE
  FROM 
      carts
  WHERE 
      carts.user_id = ?;
  `,
    [userId]
  );
};

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
  getCartMatchWithUserID,
};
