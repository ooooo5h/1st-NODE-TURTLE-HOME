const userDao = require("../models/userDao");
const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");

const signUp = async (user) => {
    const pwValidation = new RegExp(
        "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
    );

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
        const secretKey = process.env.JWT_SECRET_KEY;
        const algorithm = process.env.JWT_ALGORITHM;
        const expiresIn = process.env.JWT_EXPIRES_IN;
        const issuer    = process.env.JWT_ISSUER
        const option    = {algorithm, expiresIn, issuer};

        const token = jwt.sign({ id:userByEmail[0].id }, secretKey, option );
        return {token : token, user : userByEmail[0].korean_name}

    } else {
        throw {status : 404, message : "PASSWORD_DOES_NOT_MATCH"};
    }
}

module.exports = {
    signUp,
    signIn
}