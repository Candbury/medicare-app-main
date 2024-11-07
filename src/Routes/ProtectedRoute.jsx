import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);

  // Check if user is authenticated and has the required role
  const isAllowed = token && allowedRoles.includes(role);

  // Handle unauthenticated users
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Handle unauthorized users
  if (!isAllowed) {
    // Redirect to login with a message indicating unauthorized access
    return <Navigate to="/login" replace state={{ message: "Unauthorized access" }} />;
  }

  // Render the protected route
  return children;
};

export default ProtectedRoute;
