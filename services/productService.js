const productDao = require("../models/productDao");

const getAllProductList = async () => {
    const result = await productDao.getAllProducts();
    return result
}

module.exports = {
    getAllProductList
}