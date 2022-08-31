const jwt    = require("jsonwebtoken");
const config = require("../config");

const secretKey = config.secretKey;
const algorithm = config.algorithm;
const issuer    = config.issuer;

const createAccessToken = (user) => {

    const expiresIn = config.tokenExpiresIn;
    const option    = {algorithm, expiresIn, issuer};

    return jwt.sign({ id:user[0].id }, secretKey, option );
} 

const createRefreshToken = () => {

    const expiresIn = config.refreshTokenExpiresIn;
    const option    = {algorithm, expiresIn, issuer}

    return jwt.sign({}, secretKey, option );
} 

module.exports = {
    createAccessToken,
    createRefreshToken
}