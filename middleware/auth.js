const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
    try {
        if (!req.header('Authorization')) {
            throw {status : 401, message : "TOKEN_REQUIRED"};
        }
        const token         = req.headers.authorization.split(' ')[1]
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded_token.id;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({message : err.message})
    }
}

module.exports = {
    verifyAccessToken
}