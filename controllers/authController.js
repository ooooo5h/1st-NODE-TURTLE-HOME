const authService = require("../services/authService");

const getAccessToken = async (req, res) => {
    try {
        // step2. 클라이언트에서 refresh_token을 헤더에 담아서 보냈다.
        const refreshToken = req.header('Authorization')
        
        if (!refreshToken) {
            // setp3. refreshToken이 첨부된 경우에만 auth서비스로 보내서 보낸 토큰 분석하기
            throw { status : 400, message : "NO_TOKEN_ATTACHED" }
        }

        // step4. refreshToken 첨부됐다면 서비스로 보내기
        const result = await authService.getAccessToken(refreshToken);
        return res.status(200).json({ message : 'NEW_ACCESS_TOKEN_CREATED', "accessToken" : result.accessToken});
    } catch (e) {
        console.log(e);
        return res.status(e.status || 500).json({ message : e.message || "SERVER_ERROR"});     
    }
}

module.exports = {
    getAccessToken
}