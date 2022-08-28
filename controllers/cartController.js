const cartService = require("../services/cartService");

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
        console.log(e);
        return res.status(e.status || 500).json({ message : e.message || "SERVER_ERROR"}); 
    }
}

module.exports = {
    createCart
}