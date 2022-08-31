const cartDao = require("../models/cartDao")
const userDao = require("../models/userDao")

const createCart = async (productId, sizeId, quantity, userId) => {
    const product = await cartDao.checkIfProductExists(productId, sizeId);

    if (product.length === 0) {
        const err = new Error("PRODUCT_DOES_NOT_EXIST");
        err.status = 400;
        throw err;    
    }

    const alreadyInCart   = await cartDao.checkCartId(productId, sizeId, userId);
    const productOptionId = await cartDao.getProductOptionId(product[0].product_id, product[0].size_id)

    if (alreadyInCart.length === 0) {
        await cartDao.createCart(productOptionId[0].id, quantity, userId);
        return 'CART_CREATED_SUCCESSFULLY'
    } else {
        await cartDao.addCart(productOptionId[0].id, quantity, userId);
        return 'PRODUCT_QUANTITY_UPDATED_SUCCESSFULLY'
    }
}

const getCartByUserId = async (userId) => {
    const existUser = await userDao.getUserById(userId);

    if (existUser) {
        const existUserId = existUser[0].id;
        const result = await cartDao.getCartByUserId(existUserId);
        if (result.length === 0) {
            return "CART_IS_EMPTY"
        } else {
            return result
        }
    } else {
        throw {status : 404, message : "USER_DOES_NOT_MATCH"};
    }
}

const getCartByIdAndUserId = async (userId, cartId) => {
    const existCartMatchWithUserID = await cartDao.getCartMatchWithUserID(userId, cartId)
    
    if (existCartMatchWithUserID.length === 0) {
        throw {status : 404, message : "CART_DOES_NOT_EXIST"}
    } else {
        return existCartMatchWithUserID
    }
}

const deleteCart = async (cartId) => {
    const existCartId = await cartDao.getCartById(cartId);

    if (existCartId.length === 0) {
        throw {status : 404, message : "CART_DOES_NOT_EXIST"};
    } else {
        await cartDao.deleteCartById(cartId);
        return "CART_DELETED_SUCCESSFULLY"
    }
}

module.exports = {
    createCart,
    getCartByUserId,
    getCartByIdAndUserId,
    deleteCart
}