const jwt = require("jsonwebtoken");

const verifyRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.header('Authorization');   // Q3.refresh_token도 헤더에 authorization으로 들어오나?
        const decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        console.log('decodedToken', decodedToken)
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({message : 'INVALID_TOKEN'})
    }
}

module.exports = {
    verifyAccessToken
}




// jwt sign, verify 같은 애들
// refresh는 access를위한 , 

// 재사용성을 위해서 여기에 작성한다. 