import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { useDispatch, useSelector } from "react-redux";
import { renewToken, userTokenKey } from "./store/slices/usersSlice";
import { useEffect } from "react";
import { setInitialLoad } from "./store/slices/appSlice";
import Loading from "./pages/Loading/Loading";

function App() {
  const { initialLoad } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const setUp = async () => {
    const userToken = localStorage.getItem(userTokenKey);

    if (userToken) {
      await dispatch(renewToken()).unwrap();
    }

    dispatch(setInitialLoad(true));
  };

  useEffect(() => {
    setUp();
  }, [dispatch]);

  if (!initialLoad) {
    return <Loading />;
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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
