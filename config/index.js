module.exports = {
    secretKey            : process.env.JWT_SECRET_KEY,
    algorithm            : process.env.JWT_ALGORITHM,
    tokenExpiresIn       : process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    issuer               : process.env.JWT_ISSUER,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    host                 : process.env.DB_HOST,
    user                 : process.env.DB_USER,
    password             : process.env.DB_PASSWORD,
    port                 : process.env.DB_PORT,
    database             : process.env.DB_NAME
}