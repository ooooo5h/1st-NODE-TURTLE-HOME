const router        = require("express").Router();
const userRouter    = require("./userRouter");
const productRouter = require("./productRouter");
const cartRouter    = require("./cartRouter");
const authRouter    = require("./authRouter")
const auth          = require("../middleware/auth");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/carts", auth.verifyAccessToken, cartRouter.router);
router.use("/auth", authRouter.router);

module.exports = router;
