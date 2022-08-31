const router        = require("express").Router();
const userRouter    = require("./userRouter");
const productRouter = require("./productRouter");
const cartRouter    = require("./cartRouter");
const authRouter    = require("./authRouter")
const auth          = require("../middleware/auth");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/carts", auth.verifyAccessToken, cartRouter.router);
router.use("/auth", authRouter.router);   // step1 : access_token이 만료되면 여기로 오세요 => 헤더에 리프레시 토큰 첨부해주세요~

module.exports = router;
