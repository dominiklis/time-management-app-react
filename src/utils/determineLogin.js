import validateId from "./validateId";
import validator from "validator";

export const determineLogin = (login) => {
  const result = {
    userId: "",
    userEmail: "",
    userName: "",
  };

  if (validateId(login)) {
    result.userId = login;
  } else if (validator.isEmail(login)) {
    result.userEmail = login;
  } else result.userName = login;

  return result;
};
