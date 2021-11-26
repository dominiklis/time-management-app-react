import validator from "validator";

const minUsernameLength = 3;

const errorTexts = {
  invalidEmail: "invalid email",
  length: "username has to be at least 3 characters long",
};

const validateLogin = (login) => {
  let error = "";

  if (/[@]/.test(login)) {
    if (!validator.isEmail(login)) {
      error = errorTexts.invalidEmail;
    }
  } else {
    if (!login.trim() || login.length < minUsernameLength)
      error = errorTexts.length;
  }

  return error;
};

export default validateLogin;
