import { Navigate, Route, Routes } from 'react-router-dom'
import ServiceComponent from '../pages/ServiceMaster/ServiceComponent'
import ServiceMasterComponent from '../pages/ServiceMaster/ServiceMasterComponent'
import { isAdminUser, isUserLoggedIn } from '../services/AuthService';
import RegisterComponent from '../components/RegisterComponent';
import LoginComponent from '../components/LoginComponent';
import LocationMasterComponent from '../pages/LocationMaster/LocationMasterComponent';
import LocationComponent from '../pages/LocationMaster/LocationComponent';

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
          <Route path='/locations' element={<AuthenticatedRoute>
              <LocationMasterComponent /></AuthenticatedRoute>}></Route>
          <Route path='/counters' element={<AuthenticatedRoute>
              <ServiceMasterComponent /></AuthenticatedRoute>}></Route>
          <Route path='/screens' element={<AuthenticatedRoute>
              <ServiceMasterComponent /></AuthenticatedRoute>}></Route>

         
          <Route path='/add-service' element={<AuthenticatedRoute>
              <ServiceComponent /></AuthenticatedRoute>}></Route>
          <Route path='/add-location' element={<AuthenticatedRoute>
              <LocationComponent /></AuthenticatedRoute>}></Route>
          <Route path='/add-counter' element={<AuthenticatedRoute>
              <ServiceComponent /></AuthenticatedRoute>}></Route>
          <Route path='/add-screen' element={<AuthenticatedRoute>
              <ServiceComponent /></AuthenticatedRoute>}></Route>

         
          <Route path='/update-service/:id' element={<AuthenticatedRoute>
              <ServiceComponent /></AuthenticatedRoute>}></Route>
          <Route path='/update-location/:id' element={<AuthenticatedRoute>
              <LocationComponent /></AuthenticatedRoute>}></Route>
          <Route path='/update-counter/:id' element={<AuthenticatedRoute>
              <ServiceComponent /></AuthenticatedRoute>}></Route>
          <Route path='/update-screen/:id' element={<AuthenticatedRoute>
              <ServiceComponent /></AuthenticatedRoute>}></Route>

         
          <Route path='/register' element={<AuthenticatedRoute>
              <RegisterComponent /></AuthenticatedRoute>}></Route>

          
          <Route path='/login' element={<LoginComponent />}></Route>

        </Routes>
    
    </>
  )
}

export default Routers