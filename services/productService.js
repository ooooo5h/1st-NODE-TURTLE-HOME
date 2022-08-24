const productDao = require("../models/productDao");

const getAllProductList = async (sort) => {
    let result ;
    if (sort === 0) {
        result = await productDao.getAllProducts();
    } else {
        result = await productDao.getSortedProducts(sort)
    }
    return result
}

const getProductById = async (productId) => {
    const result = await productDao.getProductById(productId);
    if (result.length === 0) {
        throw {status : 404, message : "PRODUCT_DOES_NOT_EXIST"};
    } else {
        return result
    }
}

module.exports = {
    getAllProductList,
    getProductById
}
