const cartService = require("../services/cartService");
const errorHandler = require("../utils/errorHandler").errorHandler;

const createCart = async(req, res) => {
    try {
        const userId = req.user;
        const { productId, sizeId, quantity } = req.body;

        if (!productId || !sizeId || !quantity) {
            return res.status(400).json({message : "KEY_ERROR"});
        }

        const result = await cartService.createCart(productId, sizeId, quantity, userId);
        return res.status(200).json({message : `${result}`})
    } catch (e) {
        errorHandler (e, res);
    }
}

const getCartByUserId = async(req, res) => {
    try {
        const userId     = req.user;
        const pathUserId = req.params.userId;

        if (userId == pathUserId) {
            const resultMessage = await cartService.getCartByUserId(userId);
            return res.status(200).json({message : resultMessage})
        } else {
            throw { status : 400, message : "USER_DOES_NOT_MATCH" }
        }
    } catch (e) {
        errorHandler (e, res);
    }
}

const deleteCart = async (req, res) => {
    try {
        const cartId = req.params.cartId
        const userId = req.user;

        await cartService.getCartByIdAndUserId(userId, cartId);
        
        const resultMessage = await cartService.deleteCart(cartId);
        return res.status(200).json({message : resultMessage})

    } catch (e) {
        errorHandler (e, res);
    }
}

module.exports = {
    createCart,
    getCartByUserId,
    deleteCart
}