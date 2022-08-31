const authDao           = require("../models/authDao");
const jwt               = require("jsonwebtoken");
const config            = require("../config")
const createAccessToken = require("../utils/jwt").createAccessToken;

const getAccessToken = async (refreshToken) => {
    try {
        // step 5. 첨부된 refreshToken을 dao로 보내서 유저아이디 찾기 전에 refreshToken의 유효기간 만료 여부 체크하기.
        // 만료됐다면 verify하는 과정에서 에러 발생 catch로 들어가게 된다.
        const decodedToken = jwt.verify(refreshToken, config.secretKey);

        // step 6. 에러발생안하면 발행자가 같은가 비교하기
        if (decodedToken.iss === config.issuer) {
            // 발행자가 일치한 경우에만 accessToken 새로 생성하기
            // step 7. DB에 refresh_token을 보내서, refresh토큰이 일치하는 유저가 있나 확인해야함
            const user = await authDao.getUserByRefreshToken(refreshToken)

            if (user) {
                // step 6-2. 일치하는 유저가 있다 => DB에 저장된 refresh_token이 일치한다 => 만료전이다 => access_token 생성해
                const accessToken  = createAccessToken(user);
                return {accessToken : accessToken}
            }
        } else {
            // setp 6-1. 발행자가 일치하지 않음
            throw {status : 401, message : "INVALID_TOKEN"};
        }
    } catch (e) {
        // step 5-1. 일치하는 유저가 없다 => refresh_token도 만료됐다는 뜻 => 에러발생
        console.log(e);
        throw {status : 401, message : e.message};
    } 
}

module.exports = {
    getAccessToken
}