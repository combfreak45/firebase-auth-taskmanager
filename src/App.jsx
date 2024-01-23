import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Register from './Pages/Register'
import Reset from './Pages/Reset'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/reset' element={<Reset/>}/>
    </Routes>
  )
}

export default App
