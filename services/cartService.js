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
    const userExist = await userDao.getUserById(userId);

    if (userExist) {
        const existUserId = userExist[0].id;
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

module.exports = {
    createCart,
    getCartByUserId
}