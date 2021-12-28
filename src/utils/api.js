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
  get: (url, params) =>
    axios.get(url, { params }).then(getResponse).catch(handleError),
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
  get: (params) => requests.get("/tasks", params),

  create: (
    taskName,
    taskDescription,
    taskCompleted,
    day,
    startTime,
    endTime,
    projectId
  ) => {
    const newTask = {
      taskName,
      taskDescription,
      taskCompleted,
      projectId,
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
    endTime,
    projectId
  ) => {
    const updatedTask = {
      taskName,
      taskDescription,
      dateToComplete,
      taskCompleted,
      startTime,
      endTime,
      projectId,
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
  addStep: (taskId, stepText, position, stepCompleted) =>
    requests.post(`/tasks/${taskId}/steps`, {
      taskId,
      stepText,
      position,
      stepCompleted,
    }),

  updateStep: (stepId, taskId, stepText, stepCompleted, position) =>
    requests.put(`/tasks/${taskId}/steps/${stepId}`, {
      stepText,
      stepCompleted,
      position,
    }),

  updateMultipleSteps: (taskId, stepsToUpdate) =>
    requests.put(`/tasks/${taskId}/steps/multiple`, { stepsToUpdate }),

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

  deleteSharing: (taskId, userId) =>
    requests.delete(`/tasks/${taskId}/users/${userId}`),
};

const projects = {
  // projects
  get: () => requests.get("/projects"),

  create: (projectName, projectDescription) => {
    const newProject = {
      projectName,
      projectDescription: projectDescription ?? null,
    };

    return requests.post("/projects", newProject);
  },
};

const apiCalls = {
  users,
  tasks,
  projects,
};

export default apiCalls;
