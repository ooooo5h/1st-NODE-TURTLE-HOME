const authService = require("../services/authService");

const getAccessToken = async (req, res) => {
    try {

        // Q. 서버로 access_token 발급 요청을 refresh_token으로 하고있다. 그럼 유저정보가 없을텐데?
        // Q. 그래서 생각에는 만료된 access_token을 refresh_token이랑 같이 줘야할 것 같다. 그럼 둘다 토큰에 담아서 보내야하나?? 
        const refreshToken = req.header('Authorization')   // 사실상 만료된 access_token이 담겨있겠지
        // const realRefreshToken = req.header('Authorization)'   인가???? 헤더에 두개를 담을 수 있나? 
        
        // const userId       = req.user;         
        // console.log('refresh token', req.user)   => 유저정보가 없지.. 왜냐 현재 refresh token으로 보냈으니까! 페이로드에 유저정보 없음!! 그러네

        const result = await authService.getAccessToken(userId, refreshToken)  // userId는 access_token으로 보내면 추출가능함. 여기서부터 userID가 없네.
        return res.status(200).json({ message : 'NEW_ACCESS_TOKEN_CREATED_SUCCESSFULLY', "accessToken" : result.accessToken})
    } catch (e) {
        console.log(e);
        return res.status(e.status || 500).json({ message : e.message || "SERVER_ERROR"});     
    }
}

module.exports = {
    getAccessToken
}