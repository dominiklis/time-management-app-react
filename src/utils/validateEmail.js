import validator from "validator";

const emailError = "invalid email";

const validateEmail = (email) => {
  if (!validator.isEmail(email)) return emailError;

  return "";
};

export default validateEmail;
