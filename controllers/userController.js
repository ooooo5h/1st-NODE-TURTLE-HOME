const userService = require("../services/userService");
const errorHandler   = require("../utils/errorHandler").errorHandler;

const signUp = async (req, res) => {
    try {
        const userDto = req.body;

        if (!userDto.korean_name || !userDto.email || !userDto.password || !userDto.address || !userDto.phone_number ) {
            throw { status : 400, message : "KEY_ERROR" }
        }

        await userService.signUp (userDto);
        return res.status(201).json({ message : "SIGN_UP_SUCCESS"})

    } catch (e) {
        errorHandler(e, res);
    }
}

const signIn = async (req, res) => {
    try {
        const userDto = req.body;

        if (!userDto.email || !userDto.password) {
            throw { status : 400, message : "KEY_ERROR" }
        }

        const result = await userService.signIn (userDto);
        return res.status(200).json({ message : `WELCOME ${result.user}`, "accessToken" : result.accessToken, "refreshToken" : result.refreshToken})

    } catch (e) {
        errorHandler(e, res);
    }
}

module.exports = {
    signUp,
    signIn
}