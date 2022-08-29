const productService = require("../services/productService");

const errorHandler = (err, res) => {
  console.log(err);
  return res.status(err.status || 500).json({ message : err.message || "SERVER_ERROR"}); 
}

const getAllProducts = async (req, res) => {
  try {
    const optionsDto = {
      sort     : req.query.sort ?? 0,
      min_price: req.query.min_price,
      max_price: req.query.max_price,
      offset   : req.query.offset?? 0,
      limit    : req.query.limit?? 20
    };

    const result = await productService.getAllProductList(optionsDto);
    return res.status(200).json({ result: result });
  } catch (e) {
    errorHandler(e, res);
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      throw { status: 400, message: "KEY_ERROR" };
    }
    const result = await productService.getProductById(productId);
    return res.status(200).json({ result: result });
  } catch (e) {
    errorHandler(e, res);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
