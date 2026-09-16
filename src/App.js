import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './components/ui/Layout'
import BusinessRegister from './pages/BusinessRegister'
import Search from './pages/Search'

export default function App() {

  if( window.localStorage.getItem('jwt_token') === null ){
    return <Login />
  }

  return (
    <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>}></Route>
                <Route path='detail' element={<Detail/>}></Route>
                <Route path='register' element={<Register/>}></Route>
                <Route path='login' element={<Login/>}></Route>
                <Route path='search' element={<Search/>}></Route>
                <Route path='business_register' element={<BusinessRegister/>}></Route>
                </Route>
            </Routes>
    </BrowserRouter>

)
}
