import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const user = localStorage.getItem('user');

    return user ? children : <Navigate to="/SignIn" replace />;
};

export default ProtectedRoute;
