const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
    try {
        const token         = req.header('Authorization');
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded_token.id;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({message : 'INVALID_TOKEN'})
    }
}

module.exports = {
    validateToken
}