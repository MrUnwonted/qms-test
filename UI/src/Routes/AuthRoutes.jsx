import { isUserLoggedIn } from '../services/AuthService';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = () => {
  const isAuthenticated = isUserLoggedIn(); // Replace with your authentication logic

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRoutes;
