const router         = require("express").Router();
const cartController = require("../controllers/cartController");

router.post('/', cartController.createCart);
router.get('/user/:userId', cartController.getCartByUserId)

module.exports = {
    router
}