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
        const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
        const issuer    = process.env.JWT_ISSUER
        const option    = {algorithm, expiresIn, issuer};

        const expiresInRefresh   = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
        const refreshTokenOption = {algorithm, expiresIn : expiresInRefresh, issuer}

        const accessToken  = jwt.sign({ id:userByEmail[0].id }, secretKey, option );
        const refreshToken = jwt.sign({}, secretKey, refreshTokenOption );    
        // Q2. 
        // 여기서도 로그인할 때, DB에 저장된 refreshToken의 만료기간을 확인해서
        // refresh_token 만료 전 => accessToken 발급
        // refresh_token 만료 후 => accessToken 발급 + refreshToken 저장
        // 분기처리를 해줘야 하나요? 근데 그걸 어떻게 할 수 있지?

        await userDao.saveUserRefreshToken(userByEmail[0].id, refreshToken)
        return {accessToken : accessToken, refreshToken : refreshToken, user : userByEmail[0].korean_name}
    } else {
        throw {status : 404, message : "PASSWORD_DOES_NOT_MATCH"};
    }
}

module.exports = {
    signUp,
    signIn
}