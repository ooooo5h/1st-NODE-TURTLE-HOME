const cartDao = require("../models/cartDao")
const userDao = require("../models/userDao")

const createCart = async (productId, sizeId, quantity, userId) => {

    // 실존하는 상품 id인가 체크 => checkIfProductExist
    const product = await cartDao.checkIfProductExists(productId, sizeId);

    if (product.length === 0) {
        const err = new Error("PRODUCT_DOES_NOT_EXIST");
        err.status = 400;
        throw err;    
    }
    
    // 그러면 이제 장바구니에 이미 있는 상품인가확인
    const alreadyInCart = await cartDao.checkCartId(productId, sizeId, userId);

    // product_option_id 추출해야함
    const productOptionId = await cartDao.getProductOptionId(product[0].product_id, product[0].size_id)

    if (alreadyInCart.length === 0) {
        // 장바구니에 없는 상품 => 생성
        await cartDao.createCart(productOptionId[0].id, quantity, userId);
        return 'CART_CREATED_SUCCESSFULLY'
    } else {
        // 장바구니에 이미 있는 상품 => 업데이트
        await cartDao.addCart(productOptionId[0].id, quantity, userId);
        return 'PRODUCT_QUANTITY_UPDATED_SUCCESSFULLY'
    }
}

const getCartByUserId = async (userId) => {

    // 회원가입된 유저인가? 
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
        console.log('유저정보 없음')
        throw {status : 404, message : "USER_DOES_NOT_MATCH"};
    }
}

const getCartByIdAndUserId = async (userId, cartId) => {
    // cart id가 해당 user의 카트아이디가 맞는지 확인하기
    const existCartMatchWithUserID = await cartDao.getCartMatchWithUserID(userId, cartId)
    
    if (existCartMatchWithUserID.length === 0) {
        throw {status : 404, message : "CART_DOES_NOT_EXIST"}
    } else {
        return existCartMatchWithUserID
    }
}

const deleteCart = async (cartId) => {
    // 실제있는 카트id인가
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