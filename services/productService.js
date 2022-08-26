const productDao = require("../models/productDao");

const getAllProductList = async (optionsInfo) => {
  let result;
  if (optionsInfo.sort == 0) {
    result = await productDao.getAllProducts(optionsInfo);
  } else {
    result = await productDao.getSortedProducts(optionsInfo);
  }
  return result;
};

const getProductById = async (productId) => {
  const result = await productDao.getProductById(productId);
  if (result.length === 0) {
    throw { status: 404, message: "PRODUCT_DOES_NOT_EXIST" };
  } else {
    return result;
  }
};

module.exports = {
  getAllProductList,
  getProductById,
};
