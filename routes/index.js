const router        = require("express").Router();
const userRouter    = require("./userRouter");
const productRouter = require("./productRouter");
const cartRouter    = require("./cartRouter");
const authRouter    = require("./authRouter")
const auth          = require("../middleware/auth");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);
router.use("/cart", auth.verifyAccessToken, cartRouter.router);
router.use("/auth", auth.verifyAccessToken, authRouter.router);   // Q.access_token이 만료되면 여기로 오세요 => 토큰은 만료됐지만 유저정보 추출은 가능한가?

module.exports = router;
