const { userService } = require("../services");
const { errorHandler } = require("../utils/errorHandler");

const signUp = async (req, res) => {
  try {
    const userDto = req.body;

    if (
      !userDto.korean_name ||
      !userDto.email ||
      !userDto.password ||
      !userDto.address ||
      !userDto.phone_number
    ) {
      throw { status: 400, message: "KEY_ERROR" };
    }

    await userService.signUp(userDto);
    return res.status(201).json({ message: "SIGN_UP_SUCCESS" });
  } catch (e) {
    errorHandler(e, res);
  }
};

const signIn = async (req, res) => {
  try {
    const userDto = req.body;

    if (!userDto.email || !userDto.password) {
      throw { status: 400, message: "KEY_ERROR" };
    }

    const result = await userService.signIn(userDto);
    return res.status(200).json({
      message: `WELCOME ${result.user}`,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (e) {
    errorHandler(e, res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { name, phone_number, email, password } = req.body;

    if (!name || !phone_number || !email || !password) {
      throw { status: 400, message: "KEY_ERROR" };
    }

    await userService.updatePassword(name, phone_number, email, password);
    return res.status(200).json({ message: "PASSWORD_UPDATED" });
  } catch (e) {
    errorHandler(e, res);
  }
};

module.exports = {
  signUp,
  signIn,
  updatePassword,
};
