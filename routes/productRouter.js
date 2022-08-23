const router            = require("express").Router();
const productController = require("../controllers/productController");

router.get('/', productController.getAllProducts);

module.exports = {
    router,
}