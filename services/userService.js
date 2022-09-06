const userDao            = require("../models/userDao");
const bcrypt             = require("bcrypt");
const pwValidation       = require("../utils/pwValidation").pwValidation;
const createAccessToken  = require("../utils/jwt").createAccessToken;
const createRefreshToken = require("../utils/jwt").createRefreshToken;

const signUp = async (user) => {

    const userByEmail = await userDao.getUserByEmail(user.email)
    
    if (userByEmail.length) {
        throw {status : 409, message : "EMAIL_ALREADY_IN_USE"};
    }

    if (!pwValidation.test(user.password)) {
        const err = new Error("PASSWORD_IS_NOT_VALID");
        err.status = 400;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword

    await userDao.createUser(
        user
    );
}

const signIn = async (user) => {
    const userByEmail = await userDao.getUserByEmail(user.email)
    
    if (userByEmail.length === 0) {
        throw {status : 404, message : "USER_DOES_NOT_EXIST"};
    }

    const checkedPasswordUser = await bcrypt.compare(user.password, userByEmail[0].password);

    if (checkedPasswordUser) {
        const accessToken  = createAccessToken(userByEmail);
        const refreshToken = createRefreshToken();

        await userDao.saveUserRefreshToken(userByEmail[0].id, refreshToken)
        return {accessToken, refreshToken, user : userByEmail[0].korean_name}
    } else {
        throw {status : 404, message : "PASSWORD_DOES_NOT_MATCH"};
    }
}

module.exports = {
    signUp,
    signIn
}