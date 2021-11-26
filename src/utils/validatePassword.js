import validator from "validator";

const errorTexts = {
  length: "* min. 6 characters long",
  number: "* 1 number",
  lowercase: "* 1 lowercase letter",
  uppercase: "* 1 uppercase letter",
  specialCharacter: "* 1 special character",
};

const validatePassword = (password) => {
  const errors = [];

  if (!validator.isStrongPassword(password, { minLength: 6 })) {
    if (password.length < 6) errors.push(errorTexts.length);

    if (!/\d/.test(password)) errors.push(errorTexts.number);

    if (!/[a-z]/.test(password)) errors.push(errorTexts.lowercase);

    if (!/[A-Z]/.test(password)) errors.push(errorTexts.uppercase);

    if (!/[^a-zA-Z0-9]/.test(password))
      errors.push(errorTexts.specialCharacter);
  }

  return errors;
};

export default validatePassword;
