const userDao = require("../models/userDao");
const bcrypt  = require("bcrypt");

const signUp = async (user) => {
    const pwValidation = new RegExp(
        "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
    );

    if (!pwValidation.test(user.password)) {
        const err = new Error("PASSWORD_IS_NOT_VALID");
        err.status = 400;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword

    await userDao.createUser(
        user
    );
}

module.exports = {
    signUp
}