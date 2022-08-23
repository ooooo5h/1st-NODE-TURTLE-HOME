const router = require("express").Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");

router.use("/users", userRouter.router);
router.use("/products", productRouter.router);

module.exports = router;
