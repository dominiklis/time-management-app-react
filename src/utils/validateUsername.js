const usernameError = "username has to be at least 3 characters long";

const validateUsername = (name) => {
  if (!name || !name.trim() || name.length < 3 || name.trim().length < 3)
    return usernameError;

  return "";
};

export default validateUsername;
