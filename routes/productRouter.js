const router = require("express").Router();
const { productController } = require("../controllers");

router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);

module.exports = {
  router,
};
