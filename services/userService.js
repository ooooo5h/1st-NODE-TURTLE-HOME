const { userDao } = require("../models");
const bcrypt = require("bcrypt");
const {
  nameValidation,
  passwordValidation,
  emailValidation,
  phoneValidation,
} = require("../utils/validation");
const createAccessToken = require("../utils/jwt").createAccessToken;
const createRefreshToken = require("../utils/jwt").createRefreshToken;

const signUp = async (userDto) => {
  const userByEmail = await userDao.getUserByEmail(userDto.email);

  if (userByEmail) {
    throw { status: 409, message: "EMAIL_ALREADY_IN_USE" };
  }

  nameValidation(userDto.korean_name);
  passwordValidation(userDto.password);
  emailValidation(userDto.email);
  phoneValidation(userDto.phone_number);

  const hashedPassword = await bcrypt.hash(userDto.password, 10);
  userDto.password = hashedPassword;

  await userDao.createUser(userDto);
};

const signIn = async (userDto) => {
  const userByEmail = await userDao.getUserByEmail(userDto.email);

  if (!userByEmail) {
    throw { status: 404, message: "USER_DOES_NOT_EXIST" };
  }

  const checkedPasswordUser = await bcrypt.compare(
    userDto.password,
    userByEmail.password
  );

  if (!checkedPasswordUser) {
    throw { status: 404, message: "PASSWORD_DOES_NOT_MATCH" };
  }

  const accessToken = createAccessToken(userByEmail);
  const refreshToken = createRefreshToken();

  await userDao.saveUserRefreshToken(userByEmail.id, refreshToken);
  return { accessToken, refreshToken, user: userByEmail.korean_name };
};

module.exports = {
  signUp,
  signIn,
};
