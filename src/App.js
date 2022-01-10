import { useCallback, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInitialLoad } from "./store/slices/appSlice";
import { renewToken, userTokenKey } from "./store/slices/usersSlice";
import { getTasks } from "./store/slices/tasksSlice";
import { getProjects } from "./store/slices/projectsSlice";

import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import LoadingPage from "./components/LoadingPage/LoadingPage";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import BrowseTasksPage from "./pages/BrowseTasksPage/BrowseTasksPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  const { initialLoad } = useSelector((state) => state.app);
  const { user, token } = useSelector((state) => state.users);
  const { tasks, tasksLoaded } = useSelector((state) => state.tasks);
  const { projects, projectsLoaded } = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    const setUp = async () => {
      const userToken = localStorage.getItem(userTokenKey);

      if (userToken) {
        await dispatch(renewToken());
      }

      dispatch(setInitialLoad(true));
    };

    setUp();
  }, [dispatch]);

  const loadTasks = useCallback(async () => {
    if (tasks.length === 0 && !tasksLoaded) await dispatch(getTasks()).unwrap();
  }, [dispatch, tasks.length, tasksLoaded]);

  useEffect(() => {
    if (user.id && token) {
      loadTasks();
    }
  }, [loadTasks, token, user.id]);

  const loadProjects = useCallback(async () => {
    if (projects.length === 0 && !projectsLoaded)
      await dispatch(getProjects()).unwrap();
  }, [dispatch, projects.length, projectsLoaded]);

  useEffect(() => {
    if (user.id && token) {
      loadProjects();
    }
  }, [loadProjects, token, user.id]);

  if (!initialLoad) {
    return <LoadingPage fixed />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="browse"
            element={
              <RequireAuth>
                <BrowseTasksPage />
              </RequireAuth>
            }
          />
          <Route
            path="browse/:monthYear"
            element={
              <RequireAuth>
                <BrowseTasksPage />
              </RequireAuth>
            }
          />
          <Route
            path="projects"
            element={
              <RequireAuth>
                <ProjectsPage />
              </RequireAuth>
            }
          />
          <Route
            path="projects/:projectId"
            element={
              <RequireAuth>
                <ProjectsPage />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route
            path="search"
            element={
              <RequireAuth>
                <SearchPage />
              </RequireAuth>
            }
          />

          <Route
            path="search/:searchInput"
            element={
              <RequireAuth>
                <SearchPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
