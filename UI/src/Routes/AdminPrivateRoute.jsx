import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { isAdminUser, isUserLoggedIn } from '../services/AuthService';

const AdminPrivateRoute = ({ element }) => {
  // Check if the user is logged in and is an admin
  const isAuth = isUserLoggedIn();
  const isAdmin = isAdminUser();

  return isAuth && isAdmin ? element : <Navigate to="/" />;
};

AdminPrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
  };
  
export default AdminPrivateRoute;
