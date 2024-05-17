import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { privateRoutes, publicRoutes } from "./routes";

function App() {
  const user = useSelector((state: any) => state.auth.currentUser);
  return (
    <Router>
      <div className="app">
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
      </div>
    </Router>
  );
}

export default App;
