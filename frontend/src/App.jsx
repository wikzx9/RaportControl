import { useState } from 'react'
import {createBrowserRouter, createRoutesFromElements,  Route, RouterProvider} from 'react-router-dom'
import React from 'react'

import Home from './pages/Home'
import Login from './pages/LogIn'
import RapportDelete from './pages/RapportDelete'
import RapportEdit from './pages/RapportEdit'
import RapportList from './pages/RapportList'
import RapportShow from './pages/RapportShow'
import UserControl from './pages/UserControl'
import RootLayout from './layouts/RootLayout'
import AddUser from './pages/AddUser'
import DeleteUser from './pages/DeleteUser'
import RapportAdd from './pages/RapportAdd'
import Unauthorized from './pages/Unauthorized'
import RequireAuth from './pages/RequireAuth'
const ROLES = {
  'User': 2001,
  'Admin': 5150
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>}/>

        <Route path='/login' element={<Login/>}/>

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path='/rapport/edit/:id' element={<RapportEdit/>}/>
          <Route path='/rapport' element={<RapportList/>}/>
          <Route path='/rapport/detail/:id' element={<RapportShow/>}/>
          <Route path='/rapport/delete/:id' element={<RapportDelete/>}/>
          <Route path='/rapport/create' element={<RapportAdd/>} />
        </Route>
        
        <Route path="/unauthorized" element={<Unauthorized />} />

        
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path='/users' element={<UserControl/>}/>
          <Route path='/users/add' element={<AddUser/>}/>
          <Route path='/users/delete/:id' element={<DeleteUser/>}/>
          </Route>
        

      </Route>
    ))
  return (
    <RouterProvider router={router}/>
  )
}

export default App
