const { myDataSource } = require("../utils/database");

const getAllProducts = async (filterInfo) => {
  // LIMIT과 OFFSET만 적용된 코드 , 노정렬, 노필터
  return await myDataSource.query(
    `
  SELECT 
      p.id, p.name, p.image_url, options_min.price AS min_price, options_max.price AS max_price
  FROM 
      products AS p
  JOIN 
      products_options AS options_min
          ON options_min.id = (
              SELECT id
              FROM products_options 
              WHERE products_options.product_id = p.id
              ORDER BY price ASC
              LIMIT 1)
  JOIN 
      products_options AS options_max
          ON options_max.id = (
              SELECT id
              FROM products_options 
              WHERE products_options.product_id = p.id
              ORDER BY price DESC
              LIMIT 1)
  LIMIT 
      ?
  OFFSET
      ?;`,
    [filterInfo.limit, filterInfo.offset]
  );
};

const getAllProductsWithPriceFilter = async (optionsInfo) => {
  // 노정렬, 가격 필터만
  return await myDataSource.query(
    `
  SELECT 
      p.id, p.name, p.image_url, options_min.price AS min_price, options_max.price AS max_price
  FROM 
      products AS p
  JOIN 
      products_options AS options_min
          ON options_min.id = (
              SELECT id
              FROM products_options 
              WHERE products_options.product_id = p.id
              ORDER BY price ASC
              LIMIT 1)
  JOIN 
      products_options AS options_max
          ON options_max.id = (
              SELECT id
              FROM products_options 
              WHERE products_options.product_id = p.id
              ORDER BY price DESC
              LIMIT 1)
  WHERE 
      options_min.price < ? 
  AND 
      options_min.price > ?
  LIMIT 
      ?
  OFFSET
      ?`,
    [
      optionsInfo.max_price,
      optionsInfo.min_price,
      optionsInfo.limit,
      optionsInfo.offset,
    ]
  );
};

const getAllProductsWithPriceAndSizeFilter = async (optionsInfo) => {
  // 노정렬, 가격필터 + 사이즈필터
  return await myDataSource.query(
    `
  SELECT 
      p.id, p.name, p.image_url, options_min.price AS min_price, options_max.price AS max_price
  FROM 
      products AS p
  JOIN 
      products_options AS options_min
          ON options_min.id = (
              SELECT id
              FROM products_options 
              WHERE products_options.product_id = p.id
              ORDER BY price ASC
              LIMIT 1)
  JOIN 
      products_options AS options_max
          ON options_max.id = (
              SELECT id
              FROM products_options 
              WHERE products_options.product_id = p.id
              ORDER BY price DESC
              LIMIT 1)
  JOIN
      products_options AS po ON po.product_id = p.id
  WHERE 
      options_min.price < ? AND options_min.price > ?
  AND
      po.size_id = ?
  LIMIT 
      ?
  OFFSET
      ?`,
    [
      optionsInfo.max_price,
      optionsInfo.min_price,
      optionsInfo.size,
      optionsInfo.limit,
      optionsInfo.offset,
    ]
  );
};

const getAllProductsWithSizeFilter = async (optionsInfo) => {
  // 노정렬, 사이즈필터
  return await myDataSource.query(
    `
  SELECT 
      p.id, p.name, p.image_url, options_min.price AS min_price, options_max.price AS max_price
  FROM 
      products AS p
  JOIN 
      products_options AS options_min
          ON options_min.id = (
              SELECT id
              FROM products_options 
              WHERE products_options.product_id = p.id
              ORDER BY price ASC
              LIMIT 1)
  JOIN 
      products_options AS options_max
          ON options_max.id = (
              SELECT id
              FROM products_options 
              WHERE products_options.product_id = p.id
              ORDER BY price DESC
              LIMIT 1)
  JOIN
      products_options AS po ON po.product_id = p.id
  WHERE 
      po.size_id = ?
  LIMIT 
      ?
  OFFSET
      ?`,
    [optionsInfo.size, optionsInfo.limit, optionsInfo.offset]
  );
};

const getSortedProductsWithPrice = async (optionsInfo) => {
  const sortObject = {
    1: "ORDER BY p.created_at DESC",
    2: "ORDER BY min_price DESC",
    3: "ORDER BY min_price ASC",
  };

  const sql = `
        SELECT 
            p.id, p.name, p.image_url, options_min.price as min_price, options_max.price as max_price
        FROM 
            products AS p
        JOIN 
            products_options AS options_min
                ON options_min.id = (
                    SELECT id
                    FROM products_options 
                    WHERE products_options.product_id = p.id
                    ORDER BY price ASC
                    LIMIT 1
                )
        JOIN 
            products_options AS options_max
                ON options_max.id = (
                    SELECT id
                    FROM products_options 
                    WHERE products_options.product_id = p.id
                    ORDER BY price desc
                    LIMIT 1
                )
        WHERE 
            options_min.price < ${
              optionsInfo.max_price
            } AND options_min.price > ${optionsInfo.min_price}
        ${sortObject[`${optionsInfo.sort}`]}
        LIMIT 
            ${optionsInfo.limit}
        OFFSET
            ${optionsInfo.offset}`;
  return await myDataSource.query(sql);
};

const getSortedProductsWithPriceAndSizeFilter = async (optionsInfo) => {
  const sortObject = {
    1: "ORDER BY p.created_at DESC",
    2: "ORDER BY min_price DESC",
    3: "ORDER BY min_price ASC",
  };

  const sql = `
        SELECT 
            p.id, p.name, p.image_url, options_min.price as min_price, options_max.price as max_price
        FROM 
            products AS p
        JOIN 
            products_options AS options_min
                ON options_min.id = (
                    SELECT id
                    FROM products_options 
                    WHERE products_options.product_id = p.id
                    ORDER BY price ASC
                    LIMIT 1
                )
        JOIN 
            products_options AS options_max
                ON options_max.id = (
                    SELECT id
                    FROM products_options 
                    WHERE products_options.product_id = p.id
                    ORDER BY price desc
                    LIMIT 1
                )
        JOIN
            products_options AS po ON po.product_id = p.id
        WHERE 
            options_min.price < ${
              optionsInfo.max_price
            } AND options_min.price > ${optionsInfo.min_price}
        AND
            po.size_id = ${optionsInfo.size}
        ${sortObject[`${optionsInfo.sort}`]}
        LIMIT 
            ${optionsInfo.limit}
        OFFSET
            ${optionsInfo.offset}`;
  return await myDataSource.query(sql);
};

const getSortedProductsWithSizeFilter = async (optionsInfo) => {
  const sortObject = {
    1: "ORDER BY p.created_at DESC",
    2: "ORDER BY min_price DESC",
    3: "ORDER BY min_price ASC",
  };

  const sql = `
        SELECT 
            p.id, p.name, p.image_url, options_min.price as min_price, options_max.price as max_price
        FROM 
            products AS p
        JOIN 
            products_options AS options_min
                ON options_min.id = (
                    SELECT id
                    FROM products_options 
                    WHERE products_options.product_id = p.id
                    ORDER BY price ASC
                    LIMIT 1
                )
        JOIN 
            products_options AS options_max
                ON options_max.id = (
                    SELECT id
                    FROM products_options 
                    WHERE products_options.product_id = p.id
                    ORDER BY price desc
                    LIMIT 1
                )
        JOIN
            products_options AS po ON po.product_id = p.id
        WHERE 
            po.size_id = ${optionsInfo.size}
        ${sortObject[`${optionsInfo.sort}`]}
        LIMIT 
            ${optionsInfo.limit}
        OFFSET
            ${optionsInfo.offset}`;
  return await myDataSource.query(sql);
};

const getSortedProducts = async (optionsInfo) => {
  const sortObject = {
    1: "ORDER BY p.created_at DESC",
    2: "ORDER BY min_price DESC",
    3: "ORDER BY min_price ASC",
  };

  const sql = `
        SELECT 
            p.id, p.name, p.image_url, options_min.price as min_price, options_max.price as max_price
        FROM 
            products AS p
        JOIN 
            products_options AS options_min
                ON options_min.id = (
                    SELECT id
                    FROM products_options 
                    WHERE products_options.product_id = p.id
                    ORDER BY price ASC
                    LIMIT 1
                )
        JOIN 
            products_options AS options_max
                ON options_max.id = (
                    SELECT id
                    FROM products_options 
                    WHERE products_options.product_id = p.id
                    ORDER BY price desc
                    LIMIT 1
                )
        ${sortObject[`${optionsInfo.sort}`]}
        LIMIT 
            ${optionsInfo.limit}
        OFFSET
            ${optionsInfo.offset}`;
  return await myDataSource.query(sql);
};

const getProductByIdToCheck = async (productId) => {
  const [rows] = await myDataSource.query(
    `
  SELECT 
      p.id
  FROM 
      products AS p
  WHERE 
      p.id = ?`,
    [productId]
  );
  return rows;
};

const getProductById = async (productId) => {
  const [data] = await myDataSource.query(
    `
  SELECT 
      p.id, p.name, p.number, p.description, p.image_url, group_concat(json_object('size', s.name, 'price', po.price) separator '@') as options
  FROM 
      products as p
  INNER JOIN 
      products_options as po on po.product_id = p.id
  INNER JOIN 
      sizes as s on s.id = po.size_id
  WHERE 
      p.id= ?`,
    [productId]
  );

  data.options = data.options.split("@");
  data.options = data.options.map((result) => {
    return JSON.parse(result);
  });
  return data;
};

module.exports = {
  getAllProducts,
  getAllProductsWithPriceFilter,
  getAllProductsWithPriceAndSizeFilter,
  getAllProductsWithSizeFilter,
  getSortedProductsWithPrice,
  getSortedProductsWithPriceAndSizeFilter,
  getSortedProductsWithSizeFilter,
  getSortedProducts,
  getProductById,
  getProductByIdToCheck,
};
