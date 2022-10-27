const { cartDao } = require("../models");
const { userDao } = require("../models");

const createCart = async (productId, sizeId, quantity, userId) => {
  const product = await cartDao.checkIfProductExists(productId, sizeId);

  if (!product) {
    const err = new Error("PRODUCT_DOES_NOT_EXIST");
    err.status = 404;
    throw err;
  }

  const alreadyInCart = await cartDao.checkCartId(productId, sizeId, userId);
  const productOptionId = await cartDao.getProductOptionId(
    product.product_id,
    product.size_id
  );

  if (!alreadyInCart) {
    await cartDao.createCart(productOptionId.id, quantity, userId);
    return "CART_CREATED_SUCCESSFULLY";
  }
  await cartDao.addCart(productOptionId.id, quantity, userId);
  return "PRODUCT_QUANTITY_UPDATED_SUCCESSFULLY";
};

const getCartByUserId = async (userId) => {
  const result = await cartDao.getCartByUserId(userId);
  if (!result) {
    throw { status: 404, message: "CART_DOES_NOT_EXIST" };
  }
  return result;
};

const getCartByIdAndUserId = async (userId, cartId) => {
  const existCartMatchWithUserID = await cartDao.getCartMatchWithUserID(
    userId,
    cartId
  );

  if (!existCartMatchWithUserID) {
    throw { status: 404, message: "CART_DOES_NOT_EXIST" };
  }
  return;
};

const deleteCartByCartId = async (cartId) => {
  return await cartDao.deleteCartById(cartId);
};

const deleteAllCart = async (userId) => {
  const existCart = await cartDao.getCartByUserId(userId);

  if (!existCart) {
    throw { status: 404, message: "CART_DOES_NOT_EXIST" };
  }
  return await cartDao.deleteAllCartByUserId(userId);
};

module.exports = {
  createCart,
  getCartByUserId,
  getCartByIdAndUserId,
  deleteCartByCartId,
  deleteAllCart,
};
