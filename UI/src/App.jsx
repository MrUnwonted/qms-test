// import { useState } from 'react'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ServiceComponent from './components/ServiceComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isAdminUser, isUserLoggedIn } from './services/AuthService'
import ServiceMasterComponent from './components/ServiceMasterComponent'

function App() {

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
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:8080 */}
          {/* if(isAdmin){
            <Route path='/admin' element={<LoginComponent />}></Route>
          }else{
            <Route path='/user' element={<LoginComponent />}></Route> 
          } */}
         {isAdmin && <Route path='/admin' element={<Navigate to="/admin" />} />}
          {!isAdmin && <Route path='/user' element={<Navigate to="/user" />} />}
          {/* http://localhost:8080/todos */}
          <Route path='/todos' element={
            <AuthenticatedRoute>
              <ServiceMasterComponent />
            </AuthenticatedRoute>
          }></Route>
          {/* http://localhost:8080/api/servicemaster */}
          <Route path='/add-todo' element={
            <AuthenticatedRoute>
              <ServiceComponent />
            </AuthenticatedRoute>
          }></Route>
          {/* http://localhost:8080/update-todo/1 */}
          <Route path='/update-service/:id' element={
            <AuthenticatedRoute>
              <ServiceComponent />
            </AuthenticatedRoute>
          }></Route>

          {/* http://localhost:8080/register */}
          <Route path='/register' element={
            <AuthenticatedRoute>
              <RegisterComponent />
            </AuthenticatedRoute>
          }></Route>

          {/* http://localhost:8080/login */}
          <Route path='/login' element={<LoginComponent />}></Route>

        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
