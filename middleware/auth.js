const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
    try {
        const token         = req.header('Authorization');
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Q.토큰의 만료기간을 확인해서 만료됐는지 확인하는 로직이 필요할 줄 알았는데 안해도 자동으로 잡아주고 있다.
        req.user = decoded_token.id;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({message : 'INVALID_TOKEN'})
    }
}

module.exports = {
    verifyAccessToken
}