const router = require("express").Router();
const { cartController } = require("../controllers");

router.post("/", cartController.createCart);
router.get("/", cartController.getCartByUserId);         // 해당 사용자 전체 장바구니 조회
router.delete("/:cartId", cartController.deleteCartByCartId);
router.delete("/", cartController.deleteAllCart);

module.exports = {
  router,
};
