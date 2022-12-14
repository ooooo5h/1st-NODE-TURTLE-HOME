module.exports = {
    secretKey            : process.env.JWT_SECRET_KEY,
    algorithm            : process.env.JWT_ALGORITHM,
    tokenExpiresIn       : process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    issuer               : process.env.JWT_ISSUER,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    host                 : process.env.TYPEORM_HOST,
    user                 : process.env.TYPEORM_USERNAME,
    password             : process.env.TYPEORM_PASSWORD,
    port                 : process.env.TYPEORM_PORT,
    database             : process.env.TYPEORM_DATABASE,
    type                 : process.env.TYPEORM_CONNECTION,
}