import { Navigate } from "react-router-dom";
import routes from "../../config/routes";
import { ReactNode } from "react";

interface PrivateRouteProps {
  auth: {
    isAuthenticated: boolean;
  };
  children: ReactNode;
}

function PrivateRoute({ auth: { isAuthenticated }, children }: PrivateRouteProps) {
  return <>{isAuthenticated ? children : <Navigate to={routes.login} />};</>;
}

export default PrivateRoute;
