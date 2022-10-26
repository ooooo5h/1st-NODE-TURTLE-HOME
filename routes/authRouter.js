const router = require("express").Router();
const { authController } = require("../controllers");

router.post("/accessToken", authController.getAccessToken);

module.exports = {
  router,
};
