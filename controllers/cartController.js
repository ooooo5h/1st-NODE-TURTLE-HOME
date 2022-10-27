const { cartService } = require("../services");
const { errorHandler } = require("../utils/errorHandler");

const createCart = async (req, res) => {
  try {
    const userId = req.user;
    const { productId, sizeId, quantity } = req.body;

    if (!productId || !sizeId || !quantity) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const result = await cartService.createCart(
      productId,
      sizeId,
      quantity,
      userId
    );
    return res.status(201).json({ message: `${result}` });
  } catch (e) {
    errorHandler(e, res);
  }
};

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user;
    
    const resultMessage = await cartService.getCartByUserId(userId);
    return res.status(200).json({ data: resultMessage });
  } catch (e) {
    errorHandler(e, res);
  }
};

const deleteCartByCartId = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const userId = req.user;

    await cartService.getCartByIdAndUserId(userId, cartId);
    await cartService.deleteCartByCartId(cartId);
    return res.status(200).json({ message: "CART_DELETED_SUCCESSFULLY" });
  } catch (e) {
    errorHandler(e, res);
  }
};

const deleteAllCart = async (req, res) => {
  try {
    const userId = req.user;

    await cartService.deleteAllCart(userId);
    return res.status(200).json({ message: "DELETED_SUCCESSFULLY" });
  } catch (e) {
    errorHandler(e, res);
  }
};

module.exports = {
  createCart,
  getCartByUserId,
  deleteCartByCartId,
  deleteAllCart,
};
