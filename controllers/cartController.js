const cartService = require("../services/cartService");

const errorHandler = (err, res) => {
    console.log(err);
    return res.status(err.status || 500).json({ message : err.message || "SERVER_ERROR"}); 
}

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
        // 해당 유저인지 확인해야함.
        const userId     = req.user;
        const pathUserId = req.params.userId;
        // console.log('d/???', userId, pathUserId, typeof userId, typeof pathUserId)   ==> 둘이 타입이 다름. number vs string임.

        if (userId == pathUserId) {
            // 둘이 같은 경우에만 => 경로로 입력한 유저의 정보와 실제 첨부된 유저의 토큰상 유저 id가 일치하는 경우에만!
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