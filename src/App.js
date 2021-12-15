import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInitialLoad } from "./store/slices/appSlice";
import { renewToken, userTokenKey } from "./store/slices/usersSlice";

import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import LoadingPage from "./components/LoadingPage/LoadingPage";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import AllTasks from "./pages/AllTasks/AllTasks";

function App() {
  const { initialLoad } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    const setUp = async () => {
      const userToken = localStorage.getItem(userTokenKey);

      if (userToken) {
        await dispatch(renewToken()).unwrap();
      }

      dispatch(setInitialLoad(true));
    };

    setUp();
  }, [dispatch]);

  if (!initialLoad) {
    return <LoadingPage darkBackground fullScreen />;
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
            path="all"
            element={
              <RequireAuth>
                <AllTasks />
              </RequireAuth>
            }
          />
          <Route
            path="all/:monthYear"
            element={
              <RequireAuth>
                <AllTasks />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
