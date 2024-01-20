
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { isAdminUser } from '../services/AuthService'

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn();

    const isAdmin = isAdminUser();

    const navigator = useNavigate();

    function handleLogout() {
        logout();
        navigator('/login')
    }

    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <NavLink to="/" className="nav-link">
                                    Queue Management Application</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav'>

                            {
                                isAuth &&
                                <li className='nav-item'>
                                    <NavLink to="/services" className="nav-link">Services</NavLink>
                                </li>
                            }
                            {
                                isAuth &&
                                <li className='nav-item'>
                                    <NavLink to="/locations" className="nav-link">Locations</NavLink>
                                </li>
                            }
                            {
                                isAuth &&
                                <li className='nav-item'>
                                    <NavLink to="/counters" className="nav-link">Counters</NavLink>
                                </li>
                            }
                            {
                                isAuth &&
                                <li className='nav-item'>
                                    <NavLink to="/screens" className="nav-link">Screens</NavLink>
                                </li>
                            }

                        </ul>

                    </div>
                    <ul className='navbar-nav'>
                        {
                            isAuth && isAdmin &&
                            <li className='nav-item'>
                                <NavLink to="/register" className="nav-link">Add User</NavLink>
                            </li>
                        }

                        {
                            !isAuth &&
                            <li className='nav-item'>
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            </li>
                        }

                        {
                            isAuth &&
                            <li className='nav-item'>
                                <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                            </li>
                        }

                    </ul>
                </nav>
            </header>

        </div>
    )
}

export default HeaderComponent