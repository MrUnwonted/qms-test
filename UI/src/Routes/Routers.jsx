import { Navigate, Route, Routes } from 'react-router-dom'
import ServiceComponent from '../pages/ServiceMaster/ServiceComponent'
import ServiceMasterComponent from '../pages/ServiceMaster/ServiceMasterComponent'
import { isAdminUser, isUserLoggedIn } from '../services/AuthService';
import RegisterComponent from '../components/RegisterComponent';
import LoginComponent from '../components/LoginComponent';

function Routers() {

    const isAdmin = isAdminUser();

  function AuthenticatedRoute({children}){

    const isAuth = isUserLoggedIn();

    if(isAuth) {
      return children;
    }

    if(isAdmin){
      return <Navigate to="/" />
    }else{
    return <Navigate to="/login" />
    }

  }

  return (
    <>
    
    <Routes>
         
         {isAdmin && <Route path='/admin' element={<Navigate to="/admin" />} />}
          {!isAdmin && <Route path='/user' element={<Navigate to="/user" />} />}
          
          <Route path='/services' element={<AuthenticatedRoute>
              <ServiceMasterComponent /></AuthenticatedRoute>}></Route>
         
          <Route path='/add-service' element={<AuthenticatedRoute>
              <ServiceComponent /></AuthenticatedRoute>}></Route>
         
          <Route path='/update-service/:id' element={<AuthenticatedRoute>
              <ServiceComponent /></AuthenticatedRoute>}></Route>

         
          <Route path='/register' element={<AuthenticatedRoute>
              <RegisterComponent /></AuthenticatedRoute>}></Route>

          
          <Route path='/login' element={<LoginComponent />}></Route>

        </Routes>
    
    </>
  )
}

export default Routers