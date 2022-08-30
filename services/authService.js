const authDao = require("../models/authDao");
const jwt     = require("jsonwebtoken");

const getAccessToken = async (userId, refreshToken) => {
    const resultRefreshToken  = await authDao.getUserByRefreshToken(refreshToken);

    if (refreshToken === resultRefreshToken[0].refresh_token) {
        console.log('access 만료 + refresh 유효 => access_token 발급해주기')
        
        const secretKey = process.env.JWT_SECRET_KEY;
        const algorithm = process.env.JWT_ALGORITHM;
        const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
        const issuer    = process.env.JWT_ISSUER
        const option    = {algorithm, expiresIn, issuer};

        const accessToken  = jwt.sign({ id:userId }, secretKey, option );  
        return {accessToken : accessToken}
    } else {
        console.log('access 만료 + refresh 만료라는 이야기 => 로그아웃')
        throw {status : 401, message : "NO_ACCESS"};

        // Q1. 로그아웃을 어떻게 시키지?
        // => throw error로 연결 끊었는데 이게 맞나?
        // 새로 로그인을 하게 되고 그 때 accessToken발급 및 새로운 refreshToken이 저장되는데..
        // 로그인시 그럼 refresh_token이 DB에 저장된 refresh랑 똑같은가도 비교해야하나?
    }
}


module.exports = {
    getAccessToken
}