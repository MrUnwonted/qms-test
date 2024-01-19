// import { useState } from 'react'
import './App.css'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import Routers from '../src/Routes/Routers';


function App() {

  // const isAdmin = isAdminUser();

  // function AuthenticatedRoute({children}){

  //   const isAuth = isUserLoggedIn();

  //   if(isAuth) {
  //     return children;
  //   }

  //   if(isAdmin){
  //     return <Navigate to="/" />
  //   }else{
  //   return <Navigate to="/login" />
  //   }

  // }

  return (
    <>
      
      
        <HeaderComponent />
        <Routers />
        
        <FooterComponent />
      
      
    </>
  )
}

export default App
