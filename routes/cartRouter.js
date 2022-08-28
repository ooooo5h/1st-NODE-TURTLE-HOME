const router         = require("express").Router();
const cartController = require("../controllers/cartController");

router.post('/', cartController.createCart);

module.exports = {
    router
}