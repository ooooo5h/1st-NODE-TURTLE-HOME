const router        = require("express").Router();
const userRouter    = require("./userRouter");
const productRouter = require("./productRouter");
const cartRouter    = require("./cartRouter");
const auth          = require("../middleware/auth");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/cart", auth.validateToken, cartRouter.router);

module.exports = router;
