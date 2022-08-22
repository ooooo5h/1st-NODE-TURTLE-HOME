const userService = require("../services/userService");

const signUp = async (req, res) => {
    try {
        const userDto = req.body;

        if (!userDto.korean_name || !userDto.email || !userDto.password || !userDto.address || !userDto.phone_number ) {
            throw { status : 400, message : "KEY_ERROR" }
        }

        await userService.signUp (userDto);
        return res.status(201).json({ message : "SIGN_UP_SUCCESS"})

    } catch (e) {
        console.log(e);
        return res.status(e.status || 500).json({ message : e.message || "SERVER_ERROR"});
    }
}

const signIn = async (req, res) => {
    try {
        const userDto = req.body;

        if (!userDto.email || !userDto.password) {
            throw { status : 400, message : "KEY_ERROR" }
        }

        const result = await userService.signIn (userDto);
        return res.status(200).json({ message : `WELCOME ${result.user}`, "token" : result.token,})

    } catch (e) {
        console.log(e);
        return res.status(e.status || 500).json({ message : e.message || "SERVER_ERROR"});

    }
}

module.exports = {
    signUp,
    signIn
}