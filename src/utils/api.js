import axios from "axios";
import validator from "validator";
import { userTokenKey } from "../store/slices/usersSlice";
import { getToday } from "./days";
import { isIsoDate } from "./isIsoString";
import validateId from "./validateId";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(userTokenKey);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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

const tasks = {
  // tasks

  get: () => requests.get("/tasks"),

  create: (taskName, taskDescription, day, startTime, endTime) => {
    const newTask = {
      taskName,
      taskDescription,
    };

    if (day) newTask.dateToComplete = new Date(`${day} 00:00`).toISOString();

    if (startTime) {
      if (!day) {
        const today = getToday();
        newTask.dateToComplete = today.toISOString();
        day = today.toISOString().split("T")[0];
      }

      newTask.startTime = new Date(`${day} ${startTime}`).toISOString();
    }

    if (endTime && startTime)
      newTask.endTime = new Date(`${day} ${endTime}`).toISOString();

    return requests.post("/tasks", newTask);
  },

  update: (
    taskId,
    taskName,
    taskDescription,
    dateToComplete,
    taskCompleted,
    startTime,
    endTime
  ) => {
    const updatedTask = {
      taskName,
      taskDescription,
      dateToComplete,
      taskCompleted,
      startTime,
      endTime,
    };

    if (dateToComplete === "") {
      dateToComplete = null;
      updatedTask.dateToComplete = dateToComplete;
    }

    if (dateToComplete && !isIsoDate(dateToComplete))
      updatedTask.dateToComplete = new Date(
        `${dateToComplete} 00:00`
      ).toISOString();

    if (startTime && !isIsoDate(startTime)) {
      if (!dateToComplete) {
        const today = getToday();
        updatedTask.dateToComplete = today.toISOString();
        dateToComplete = today.toISOString().split("T")[0];
      }

      updatedTask.startTime = new Date(
        `${dateToComplete} ${startTime}`
      ).toISOString();
    } else if (startTime === "") updatedTask.startTime = null;

    if (endTime && startTime && !isIsoDate(endTime))
      updatedTask.endTime = new Date(
        `${dateToComplete} ${endTime}`
      ).toISOString();
    else if (endTime === "") updatedTask.endTime = null;

    if (typeof taskCompleted === "boolean")
      updatedTask.taskCompleted = taskCompleted;

    return requests.put(`/tasks/${taskId}`, updatedTask);
  },

  delete: (taskId) => requests.delete(`/tasks/${taskId}`),

  // steps

  addStep: (taskId, stepText) =>
    requests.post(`/tasks/${taskId}/steps`, { taskId, stepText }),

  updateStep: (stepId, taskId, stepText, stepCompleted) =>
    requests.put(`/tasks/${taskId}/steps/${stepId}`, {
      stepText,
      stepCompleted,
    }),

  deleteStep: (stepId, taskId) =>
    requests.delete(`/tasks/${taskId}/steps/${stepId}`),

  // sharing tasks

  shareTask: (
    taskId,
    login,
    canShare,
    canChangePermissions,
    canEdit,
    canDelete
  ) => {
    let userId,
      userName,
      userEmail = "";

    if (validateId(login)) {
      userId = login;
    } else if (validator.isEmail(login)) {
      userEmail = login;
    } else userName = login;

    return requests.post(`/tasks/${taskId}/users`, {
      userId,
      userName,
      userEmail,
      canShare,
      canChangePermissions,
      canEdit,
      canDelete,
    });
  },

  editSharing: (
    taskId,
    userId,
    canShare,
    canChangePermissions,
    canEdit,
    canDelete
  ) =>
    requests.put(`/tasks/${taskId}/users/${userId}`, {
      canShare,
      canChangePermissions,
      canEdit,
      canDelete,
    }),
};

const apiCalls = {
  users,
  tasks,
};

export default apiCalls;
