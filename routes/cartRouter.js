const router = require("express").Router();
const { cartController } = require("../controllers");

router.post("/", cartController.createCart);
router.get("/user/:userId", cartController.getCartByUserId);
router.delete("/:cartId", cartController.deleteCart);
router.delete("/", cartController.deleteAllCart);

module.exports = {
  router,
};
