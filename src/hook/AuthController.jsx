import { Navigate } from 'react-router-dom';

function AuthController({ children }) {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/famsignin" replace />;
}

export default AuthController;