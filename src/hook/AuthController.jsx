import { Navigate } from 'react-router-dom';

function AuthController({ children }) {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/fam-sign" replace />;
}

export default AuthController;