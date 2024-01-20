import { Navigate, Route, Routes } from 'react-router-dom'
import ServiceComponent from '../pages/ServiceMaster/ServiceComponent'
import ServiceMasterComponent from '../pages/ServiceMaster/ServiceMasterComponent'
import { isAdminUser, isUserLoggedIn } from '../services/AuthService';
import RegisterComponent from '../components/RegisterComponent';
import LoginComponent from '../components/LoginComponent';
import LocationMasterComponent from '../pages/LocationMaster/LocationMasterComponent';
import LocationComponent from '../pages/LocationMaster/LocationComponent';
import CounterMasterComponent from '../pages/CounterMaster/CounterMasterComponent'
import CounterComponent from '../pages/CounterMaster/CounterComponent'
import ScreenComponent from '../pages/ScreenMaster/ScreenComponent';
import ScreenMasterComponent from '../pages/ScreenMaster/ScreenMasterComponent';
import WelcomeComponent from '../components/WelcomeComponent'
import WelcomeAdminComponent from '../components/WelcomeAdminComponent';

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
         
         {isAdmin && <Route path='/' element={ <WelcomeAdminComponent/>} />}
         {!isAdmin  && <Route path='/' element={ <WelcomeComponent/>} />}
          
          <Route path='/services' element={<AuthenticatedRoute>
              <ServiceMasterComponent /></AuthenticatedRoute>}></Route>
          <Route path='/locations' element={<AuthenticatedRoute>
              <LocationMasterComponent /></AuthenticatedRoute>}></Route>
          <Route path='/counters' element={<AuthenticatedRoute>
              <CounterMasterComponent /></AuthenticatedRoute>}></Route>
          <Route path='/screens' element={<AuthenticatedRoute>
              <ScreenMasterComponent /></AuthenticatedRoute>}></Route>

         
          <Route path='/add-service' element={<AuthenticatedRoute>
              <ServiceComponent /></AuthenticatedRoute>}></Route>
          <Route path='/add-location' element={<AuthenticatedRoute>
              <LocationComponent /></AuthenticatedRoute>}></Route>
          <Route path='/add-counter' element={<AuthenticatedRoute>
              <CounterComponent /></AuthenticatedRoute>}></Route>
          <Route path='/add-screen' element={<AuthenticatedRoute>
              <ScreenComponent /></AuthenticatedRoute>}></Route>

         
          <Route path='/update-service/:id' element={<AuthenticatedRoute>
              <ServiceComponent /></AuthenticatedRoute>}></Route>
          <Route path='/update-location/:id' element={<AuthenticatedRoute>
              <LocationComponent /></AuthenticatedRoute>}></Route>
          <Route path='/update-counter/:id' element={<AuthenticatedRoute>
              <CounterComponent /></AuthenticatedRoute>}></Route>
          <Route path='/update-screen/:id' element={<AuthenticatedRoute>
              <ScreenComponent /></AuthenticatedRoute>}></Route>

         
          <Route path='/register' element={<AuthenticatedRoute>
              <RegisterComponent /></AuthenticatedRoute>}></Route>

          
          <Route path='/login' element={<LoginComponent />}></Route>

        </Routes>
    
    </>
  )
}

export default Routers