const authDao           = require("../models/authDao");
const jwt               = require("jsonwebtoken");
const config            = require("../config")
const createAccessToken = require("../utils/jwt").createAccessToken;

const getAccessToken = async (refreshToken) => {
    try {
        const decodedToken = jwt.verify(refreshToken, config.secretKey);

        if (decodedToken.iss === config.issuer) {
            const user = await authDao.getUserByRefreshToken(refreshToken)

            if (user) {
                const accessToken  = createAccessToken(user);
                return {accessToken : accessToken}
            }
        } else {
            throw {status : 401, message : "INVALID_TOKEN"};
        }
    } catch (e) {
        console.log(e);
        throw {status : 401, message : e.message};
    } 
}

module.exports = {
    getAccessToken
}