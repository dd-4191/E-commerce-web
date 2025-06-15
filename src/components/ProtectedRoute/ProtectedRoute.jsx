import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ Children }) => {
  const { user } = useAuth();
  if (!user) {
    alert("Please Login First...!");
    return <Navigate to={"/login"} replace />;
  }
  return Children;
};

export default ProtectedRoute;
