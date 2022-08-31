const authDao = require("../models/authDao");
const jwt     = require("jsonwebtoken");

const getAccessToken = async (refreshToken) => {
    try {
        // step5. 첨부된 refreshToken을 dao로 보내서 유저아이디 찾기 전에 refreshToken의 유효기간 만료 여부 체크하기.
        // 만료됐다면 verify하는 과정에서 에러 발생 catch로 들어가게 된다.
        const decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);

        // 에러발생안하면 발생자가 같은가 비교한 뒤
        if (decodedToken.iss === process.env.JWT_ISSUER) {
            // step 6. 발행자가 일치한 경우에만 accessToken 새로 생성하기
            // step 6-1. DB에 refresh_token을 보내서, refresh토큰이 일치하는 유저가 있나 확인해야함
            const user = await authDao.getUserByRefreshToken(refreshToken)

            if (user) {
                // step 6-2. 일치하는 유저가 있다 => DB에 저장된 refresh_token이 일치한다 => 만료전이다 => access_token 생성해
                const secretKey = process.env.JWT_SECRET_KEY;
                const algorithm = process.env.JWT_ALGORITHM;
                const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
                const issuer    = process.env.JWT_ISSUER
                const option    = {algorithm, expiresIn, issuer};

                const accessToken  = jwt.sign({ id:user[0].id }, secretKey, option ); 
                return {accessToken : accessToken}
            }
        } 
    } catch (e) {
        // step 5-2. 일치하는 유저가 없다 => refresh_token도 만료됐다는 뜻 => 에러발생
        console.log(e);
        throw {status : 401, message : e.message};
    } 
}

module.exports = {
    getAccessToken
}