// import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
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
      
      <BrowserRouter>
        <HeaderComponent />
        <Routers />
        <FooterComponent />
      </BrowserRouter>
      
    </>
  )
}

export default App
