const authService = require("../services/authService");
const errorHandler = require("../utils/errorHandler").errorHandler;

const getAccessToken = async (req, res) => {
    try {
        const refreshToken = req.header('Authorization')
        
        if (!refreshToken) {
            throw { status : 400, message : "NO_TOKEN_ATTACHED" }
        }

        const result = await authService.getAccessToken(refreshToken);
        return res.status(200).json({ message : 'NEW_ACCESS_TOKEN_CREATED', "accessToken" : result.accessToken});
    } catch (e) {
        errorHandler (e, res);
    }
}

module.exports = {
    getAccessToken
}