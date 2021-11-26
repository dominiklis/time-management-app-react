import axios from "axios";
import validator from "validator";

axios.defaults.baseURL = "http://localhost:5000/api";

const delay = (d) => new Promise((resolve) => setTimeout(resolve, d));

axios.interceptors.response.use(async (response) => {
  await delay(1500);
  return response;
});

const getResponse = (response) => {
  return {
    success: true,
    data: response.data,
    status: response.status,
  };
};

const handleError = (error) => {
  if (error.response)
    return {
      success: false,
      status: error.response.status,
      message: error.response.data.message,
    };
  else if (error.request) return error.request;
  console.log(error);
};

const requests = {
  get: (url) => axios.get(url).then(getResponse).catch(handleError),
  post: (url, body) =>
    axios.post(url, body).then(getResponse).catch(handleError),
  put: (url, body) => axios.put(url, body).then(getResponse).catch(handleError),
  delete: (url) => axios.delete(url).then(getResponse).catch(handleError),
};

const users = {
  login: (login, password) => {
    let name,
      email = "";

    if (validator.isEmail(login)) email = login;
    else name = login;

    console.log("name", name);
    console.log("email", email);

    return requests.post("/users/login", { email, name, password });
  },
  register: (name, email, password) =>
    requests.post("/users/register", { email, name, password }),
  update: (newName, newEmail, newPassword, currentPassword) =>
    requests.put("/users", {
      newName,
      newEmail,
      newPassword,
      currentPassword,
    }),
  renew: () => requests.get("/users/renew"),
};

const apiCalls = {
  users,
};

export default apiCalls;
