const nameValidation = (name) => {
  const nameRegExp = /^[가-힣]+$/;
  if (!nameRegExp.test(name)) {
    const err = new Error("NAME_IS_NOT_VALID");
    err.status = 400;
    throw err;
  }
}

const passwordValidation = (password) => {
  const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
  if (!passwordRegExp.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.status = 400;
    throw err;
  }
};

const emailValidation = (email) => {
  const emailRegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  if (!emailRegExp.test(email)) {
    const err = new Error("EMAIL_IS_NOT_VALID");
    err.status = 400;
    throw err;
  }
};

const phoneValidation = (phone) => {
  const phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/;
  if (!phoneRegExp.test(phone)) {
    const err = new Error("PHONE_IS_NOT_VALID");
    err.status = 400;
    throw err;
  }
};

module.exports = {
  nameValidation,
  passwordValidation,
  emailValidation,
  phoneValidation
};
