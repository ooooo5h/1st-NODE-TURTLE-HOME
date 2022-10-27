const router = require("express").Router();
const { userController } = require("../controllers");

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.patch("/password", userController.updatePassword);

module.exports = {
  router,
};
