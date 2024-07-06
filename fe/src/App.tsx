import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react/jsx-runtime";
import PrivateRoute from "./components/PrivateRoute";
import { RootState } from "./redux/state";
import { privateRoutes, publicRoutes } from "./routes";

function App() {
  const user = useSelector((state: RootState) => state.auth.currentUser);
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout ? route.layout : Fragment;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {privateRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout ? route.layout : Fragment;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute auth={{ isAuthenticated: user !== null }}>
                  <Layout>
                    <Page />
                  </Layout>
                </PrivateRoute>
              }
            />
          );
        })}
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;