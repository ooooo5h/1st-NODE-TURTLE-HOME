const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
    try {
        const token         = req.header('Authorization');
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